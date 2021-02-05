# logger

![npm](https://img.shields.io/npm/v/@shirtiny/logger) ![NPM](https://img.shields.io/npm/l/@shirtiny/logger) ![npm](https://img.shields.io/npm/dt/@shirtiny/logger)

[![NPM](https://nodei.co/npm/@shirtiny/logger.png)](https://nodei.co/npm/@shirtiny/logger/)

## Introduction

> simple console log with color.

![preview](https://user-images.githubusercontent.com/49592759/107003893-72ad1d00-67c8-11eb-9d91-afa1353c221d.png)

## Installation

**use npm**

```shell
npm i @shirtiny/logger
```

 **use yarn**

```
yarn add @shirtiny/logger
```

## Usage

```js
import { Logger } from "@shirtiny/logger";

const logger = new Logger();

logger.version("project name", "1.0.1", {
  level: 0,
});

logger.log("log", { level: 0 }, ", logger default options: ", logger.option);
logger.debug("debug message", { level: 4 });
logger.http("req and rep", { level: 3 });
logger.api("api message", { level: 3 });
logger.service("service data", { level: 2 });
logger.interval("interval task", { level: 1 });
logger.key("ENTER", { level: 0 });
logger.warn("warnning message", { level: 1 });
logger.error(new Error("error message"), { level: 0 });
```

## Options

```js
const logger = new Logger({
  // your console implement, default : window.console 
  console,
  // enable logger, default true  
  enable: true,
  // logger level , default 4  
  level: 4,
});

// logger levels
const Levels = {
  version: 0,
  error: 0,
  key: 0,
  warn: 1,
  interval: 1,
  service: 2,
  api: 3,
  http: 3,
  debug: 4,
};
```

## Custom

