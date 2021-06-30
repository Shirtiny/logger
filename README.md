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
  error = 0,
  key = 0,
  warn = 1,
  interval = 1,
  service = 2,
  api = 3,
  http = 3,
  debug = 3,
}
```

## Custom

> tips: It is recommended to install the vscode-styled-components for vscode.

```typescript
import { Logger, css } from "@shirtiny/logger";

// Or extends ShLogger if you like.
export class CustomerLogger extends Logger {
    
  custom = (message: string, ...data: any[]) => {
    // console.log(this);  
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

const customerLogger = new CustomerLogger();

customerLogger.custom("my custom log");
```

## Versions
- v1.2.4 JavaScript
- v2.*.*  TypeScript
