const debug = (msg) => {
  console.log(msg);
};

class HTTPError extends Error {
  private response: object;
  private status: number;

  constructor(response) {
    super(response.statusText);
    this.response = response;
    this.stack = new Error(response.statusText).stack;
    this.status = response.status;
  }
}

class TextHTTPError extends HTTPError {
  private data: object;
  constructor(response, data) {
    super(response);
    this.data = data;
  }
}

class NotAuthorizedError extends HTTPError {
  constructor(response) {
    super(response);
  }
}

class JSONHTTPError extends HTTPError {
  private json: object;
  constructor(response, json) {
    super(response);
    this.json = json;
  }
}

class BadRequestError extends JSONHTTPError {
  constructor(response, json) {
    super(response, json);
  }
}

class ApiClient {
  private baseUrl: string;
  constructor(baseUrl = "/api/v2/") {
    this.baseUrl = baseUrl;
  }

  toString() {
    return `<ApiClient baseUrl=${this.baseUrl}>`;
  }

  /** Fetch standard headers that should be set per-request. */
  _getHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": this._getCsrfCookie(),
    };
  }

  _getCsrfCookie(name = 'csrftoken') {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1];
  }

  async _processResponse(response) {
    const contentType = response.headers.get("Content-Type");
    const isJSON = contentType && contentType.match(/json/);
    const data = isJSON ? await response.json() : await response.text();
    if (response.ok) {
      return data;
    }
    if (isJSON) {
      if (response.status === 403 || response.status === 401) {
        throw new NotAuthorizedError(response);
      } else if (response.status === 400) {
        throw new BadRequestError(response, data);
      }
      throw new JSONHTTPError(response, data);
    }
    throw new TextHTTPError(response, data);
  }

  async _fetch(method, path, data = null, params = {}) {
    const querystring = new URLSearchParams();
    for (let key in params) {
      querystring.append(key, params[key]);
    }
    const rawQs = querystring.toString();
    const qs = rawQs ? `?${rawQs}` : "";
    const url = `${this.baseUrl}${path}${qs}`;

    const headers = this._getHeaders();

    const encodedData = data ? JSON.stringify(data) : null;
    const options = <RequestInit> {
      method,
      headers: {
        ...headers,
      },
      body: undefined,
      credentials: 'include',
    };
    if (data) {
      options.headers["Content-Length"] = encodedData.length;
      options.body = encodedData;
    }
    debug(`>>> ${method} ${url} options=${JSON.stringify(options)}`);
    try {
      const response = await fetch(url, options);
      const data = await this._processResponse(response);
      debug(`<<< ${method} ${url} [${response.status}]`);
      return data;
    } catch (e) {
      debug(`!!! ${method} ${url} [${e.status}]: ${e}`);
      throw e;
    }
  }

  async _get(path, params = {}) {
    return this._fetch("GET", path, null, params);
  }

  async _post(path, data = null, params = {}) {
    return this._fetch("POST", path, data, params);
  }

  async getEvents() {
    return this._get("events");
  }

  async getSystemStatus() {
    return this._get("status");
  }

  async getCurrentUser() {
    try {
      return this._get("auth/current-user");
    } catch (e) {
      if (e instanceof NotAuthorizedError) {
        return null;
      }
      throw e;
    }
  }

  async login(username: string, password: string) {
    const data = {
      username,
      password,
    };
    return this._post("auth/login", data);
  }

  async logout() {
    return this._post("auth/logout");
  }
}

export default ApiClient;
