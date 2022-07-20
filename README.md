# Kegbot Frontend

React app powering the Kegbot dashboard.

> 🚧 **Current status:** Experimental. Hackers welcome! 🚧

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Developer instructions](#developer-instructions)
  - [Initial setup](#initial-setup)
  - [Running the development server](#running-the-development-server)
  - [Rebuild `README.md` TOC](#rebuild-readmemd-toc)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

This is a TypeScript + ReactJS app, using [Parcel](https://parceljs.org/) to compile and bundle assets.

The long term goal is for it to replace the old and unmaintained dashboard that is built into [`kegbot-server`](https://github.com/kegbot/kegbot-server). A shorter-term goal is make it more fun and easier for frontend developers to contribute to that frontend!

Currently, the frontend only runs from a developer environment. It will eventually be bundled into `kegbot-server` when it is ready.

## Developer instructions

### Initial setup

Install the various javascript dependencies:

```
$yarn install
```

### Running the development server

Run this command while hacking on the frontend:

```
yarn start
```

This command will:

* Activate `parcel` and start watching source
* Launch a hot-reloading devserver on `http://localhost:1234`
* Run a proxy to `http://localhost:8008/` for accessing the `kegbot-server` (backend)

### Rebuild `README.md` TOC

```
yarn toc
```

## Contributing

File an issue to discuss, open a PR, or pop into the [Kegbot Slack](https://github.com/Kegbot/kegbot-server/blob/master/README.md#documentation-and-help) and say hello.