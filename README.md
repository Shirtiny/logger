# logger

![npm](https://img.shields.io/npm/v/@shirtiny/logger) ![NPM](https://img.shields.io/npm/l/@shirtiny/logger) ![npm](https://img.shields.io/npm/dt/@shirtiny/logger)

[![NPM](https://nodei.co/npm/@shirtiny/logger.png)](https://nodei.co/npm/@shirtiny/logger/)

## Introduction

> simple console log with css, write in typescript.

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

```typescript
import logger, { LEVELS } from "@shirtiny/logger";
import { name, version } from "../package.json";

logger.version(name, version, { level: LEVELS.version });

logger.log(
  "log",
  { level: LEVELS.log },
  ", logger default options: ",
  logger.getLoggerOption(),
);

logger.debug("debug message", { level: LEVELS.debug });
logger.http("req and rep", { level: LEVELS.http });
logger.api("api message", { level: LEVELS.api });
logger.service("service data", { level: LEVELS.service });
logger.interval("interval task", { level: LEVELS.interval });
logger.key("ENTER", { level: LEVELS.key });
logger.warn("warnning message", { level: LEVELS.warn });
logger.error(new Error("error message"), { level: LEVELS.error });

// disable log
logger.setEnable(false);
// change log level
logger.setLevel(39);
```

## Options

```typescript
import { theme, ShLogger } from "@shirtiny/logger";

const logger = new ShLogger({
  // enable logger, default true
  enable: true,
  // logger level , default 39
  level: 3,
  // log shape style , default slider theme
  shape: theme.shapes.slider,
  // your log implement, default window.console.log
  log: (...data) => console.log(...data),
});

// logger levels
enum LEVELS {
  log = 0,
  version = 0,
  error = 1,
  warn = 2,
  key = 3,
  interval = 3,
  service = 4,
  api = 5,
  http = 6,
  debug = 7,
}
```

## Custom

> tips: It is recommended to install the vscode-styled-components for vscode.

- extends ShLogger for custom

```typescript
import { ShLogger, css } from "@shirtiny/logger";

class CustomerLogger extends ShLogger {
  custom = (message: string, ...data: any[]) => {
    this.formatShapeLog(
      {
        level: 4, // the level of this log method
        title: " CUSTOM :",
        color: "#3f6600",
      },
      message,
      ...data,
    );
  };
  
  custom2 = (message: string, ...data: any[]) => {
    const level = 4;
    this.formatLog(
      level,
      " Custom ",
      message,
      // style for " Custom ",
      css`
        color: #fff;
        padding: 2px;
        background-color: #3f6600;
        border-radius: 3px;
        margin-right: 8px;
      `,
      // style for message,
      css`
        color: #3f6600;
        font-size: 15px;
        font-family: "Trebuchet MS";
      `,
      ...data,
    );
  };
  
  custom3 = (message: string, ...data: any[]) => {
    const level = 4;
    this.customFormat(
      level,
      [
        {
        str:  " Custom ",
        style: css`
          color: #fff;
          padding: 2px;
          background-color: #3f6600;
          border-radius: 3px;
          margin-right: 8px;
        `,
        },
        {
        str:  message,
        style: css`
          color: #3f6600;
          font-size: 15px;
          font-family: "Trebuchet MS";
        `,
        }
      ]
      ...data,
    );
  };
  
}

const customLogger = new CustomerLogger();

customLogger.custom("custom message", { data: "any data" });
```

- full custom (if don't need ShLogger's method)

```typescript
import { Logger, css } from "@shirtiny/logger";

class FullCustomerLogger extends Logger {
  custom = (message: string, ...data: any[]) => {
    const level = 4;
    this.formatLog(
      level,
      " Custom ",
      message,
      css`
        color: #fff;
        padding: 2px;
        background-color: #3f6600;
        border-radius: 3px;
        margin-right: 8px;
      `,
      css`
        color: #3f6600;
        font-size: 15px;
        font-family: "Trebuchet MS";
      `,
      ...data,
    );
  };
}

const customerLogger = new FullCustomerLogger();

customerLogger.custom("my custom log");
```

## Versions

- 1.2.4 JavaScript
- ^2.1.7 TypeScript
