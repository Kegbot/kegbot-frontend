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

### Install pre-commit hooks

We use `pre-commit` to automatically run `prettier` and similar tools on commit.

Install it upon first checkout:

```
pre-commit install
```

### Chore: Rebuild `README.md` TOC

If you update this readme, run this command

```
yarn toc
```

### Code structure

Code is organized as follows:

* `App.tsx`: The main application entry point. All routes are defined here.
* `view/`: React components corresponding to main pages of the application, such as `<HomeView />`.
* `component/`: Other reusable React components, such as the `<TopNav />` navbar.
* `lib/`: Everything else, like the TypeScript client for the `kegbot-server` API.

A hierarchy of React `ContextProviders` is installed in `App`, which performs various setup functions and provides global-like utilities to other components:

* `ApiProvider`: Provides an instance of `ApiClient` to any component needing one.
* `CurrentUserProvider`: Provides the current logged-in user, or `null`, as well as `login()` and `logout()` methods.
* `SystemStatusProvider`: Provides summarized status of the backend system, and forces the user to log in if the site is in private move.

Component file names use `CamelCase`, and should be consistent with the symbol names they export.


## Contributing

File an issue to discuss, open a PR, or pop into the [Kegbot Slack](https://github.com/Kegbot/kegbot-server/blob/master/README.md#documentation-and-help) and say hello.