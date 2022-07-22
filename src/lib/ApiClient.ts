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

export interface Paginated<T> {
  next: string | null;
  previous: string | null;
  results: [T];
}

export interface Picture {
  resized_url: string;
  resized_png_url: string;
  thumbnail_url: string;
  thumbnail_png_url: string;
}

export interface Stats {
  [key: string]: any;
}

export interface SiteStatus {
  name: string;
  server_version: string;
  is_setup: boolean;
  volume_display_units: string;
  temperature_display_units: string;
  title: string;
  background_image: Picture | null;
  google_analytics_id: string | null;
  session_timeout_minutes: number;
  privacy: string;
  registration_mode: string;
  timezone: string;
  enable_sensing: boolean;
  enable_users: boolean;
  stats: Stats;
}

export interface Keg {
  id: number;
}

export interface Drink {
  id: number;
}

export interface User {
  username: string;
  picture: Picture | null;
}

export interface SystemEvent {
  id: number;
  kind: string;
  time: string;
  drink: Drink | null;
  user: User | null;
  keg: Keg | null;
}

export interface Tap {
  id: number;
  name: string;
  current_keg: Keg | null;
}

export interface SystemStatus {
  site: SiteStatus;
  events: [SystemEvent];
  taps: [Tap];
}

class ApiClient {
  private baseUrl: string;
  constructor(baseUrl = '/api/v2/') {
    this.baseUrl = baseUrl;
  }

  toString() {
    return `<ApiClient baseUrl=${this.baseUrl}>`;
  }

  /** Fetch standard headers that should be set per-request. */
  _getHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': this._getCsrfCookie(),
    };
  }

  _getCsrfCookie(name = 'csrftoken') {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];
  }

  async _processResponse(response) {
    const contentType = response.headers.get('Content-Type');
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
    const qs = rawQs ? `?${rawQs}` : '';
    const url = `${this.baseUrl}${path}${qs}`;

    const headers = this._getHeaders();

    const encodedData = data ? JSON.stringify(data) : null;
    const options = {
      method,
      headers: {
        ...headers,
      },
      body: undefined,
      credentials: 'include',
    };
    if (data) {
      options.headers['Content-Length'] = encodedData.length;
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
    return this._fetch('GET', path, null, params);
  }

  async _post(path, data = null, params = {}) {
    return this._fetch('POST', path, data, params);
  }

  async getEvents(): Promise<Paginated<SystemEvent>> {
    return this._get('events');
  }

  async getSystemStatus(): Promise<SystemStatus> {
    return this._get('status');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return this._get('auth/current-user');
    } catch (e) {
      if (e instanceof NotAuthorizedError) {
        return null;
      }
      throw e;
    }
  }

  async login(username: string, password: string): Promise<User> {
    const data = {
      username,
      password,
    };
    return this._post('auth/login', data);
  }

  async logout(): Promise<null> {
    return this._post('auth/logout');
  }
}

export default ApiClient;
