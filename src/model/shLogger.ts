import { css, selectCss, DUTY } from "./../style/index";
import { Colors } from "./../style/theme";
import { Logger } from "./logger";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 10:25:33
 * @LastEditTime: 2021-06-25 11:51:43
 * @Description:
 */

export enum LEVELS {
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

type LogType = {
  name: string;
  title: string;
  color: Colors;
  level: LEVELS;
};

interface ILogTypes {
  [logName: string]: LogType;
}

const logTypes: ILogTypes = {
  debug: {
    name: "debug",
    title: " Debug :",
    color: Colors.lime,
    level: LEVELS.debug,
  },
  http: {
    name: "http",
    title: " Http :",
    color: Colors.weakBlue,
    level: LEVELS.http,
  },
  api: {
    name: "api",
    title: " Api :",
    color: Colors.cyan,
    level: LEVELS.api,
  },
  service: {
    name: "service",
    title: " Service :",
    color: Colors.purple,
    level: LEVELS.service,
  },
  interval: {
    name: "interval",
    title: " Interval :",
    color: Colors.pink,
    level: LEVELS.interval,
  },
  warn: {
    name: "warn",
    title: " WARN :",
    color: Colors.orange,
    level: LEVELS.warn,
  },
  error: {
    name: "error",
    title: " ERR :",
    color: Colors.red,
    level: LEVELS.error,
  },
  // 以下实现时有所不同
  key: {
    name: "key",
    title: " Key :",
    color: Colors.darkPurple,
    level: LEVELS.key,
  },
  // version: {
  //   name: "version",
  //   level: LEVELS.version,
  // },
};

export class ShLogger extends Logger {
  formatLogWrapper(type: LogType | undefined, message: string, ...data: any[]) {
    if (!type) return;
    this.formatLog(
      type.level,
      type.title,
      message,
      selectCss(
        { color: type.color },
        this.getLoggerOption().shape,
        DUTY.title,
      ),
      selectCss(
        { color: type.color },
        this.getLoggerOption().shape,
        DUTY.message,
      ),
      ...data,
    );
  }

  debug(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.debug, message, ...data);
  }

  http(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.http, message, ...data);
  }

  api(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.api, message, ...data);
  }

  service(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.service, message, ...data);
  }

  interval(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.interval, message, ...data);
  }

  warn(message: string, ...data: any[]) {
    this.formatLogWrapper(logTypes.warn, message, ...data);
  }

  error = (error: Error, ...data: any[]) => {
    this.formatLogWrapper(logTypes.error, `${error.stack}\n`, ...data);
  };

  key = (keyName: string, ...data: any[]) => {
    const type = logTypes.key;
    this.formatLog(
      type.level,
      type.title,
      keyName.toUpperCase(),
      selectCss(
        { color: type.color },
        this.getLoggerOption().shape,
        DUTY.title,
      ),
      selectCss({}, this.getLoggerOption().shape, DUTY.message_button),
      ...data,
    );
  };

  version = (name: string = "", version: string, ...data: any[]) => {
    this.formatLog(
      LEVELS.version,
      name.toUpperCase(),
      version,
      css`
        background: linear-gradient(to right, #009fff, #ec2f4b);
        color: white;
        padding: 2px 5px;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      `,
      css`
        background-color: ${Colors.darkPurple};
        color: white;
        padding: 2px 5px;
      `,
      ...data,
    );
  };
}
