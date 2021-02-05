import style from "../style";
import Console from "./console";

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

class Logger extends Console {
  constructor(option, customLogs = (log, option) => {}) {
    super(option);
    for (const key in customLogs(this.log, this.option)) {
      if (Object.hasOwnProperty.call(customLogs, key)) {
        this[key] = customLogs[key];
      }
    }
  }

  debug = (message, ...data) => {
    if (this.option.level < Levels.debug) return;
    return this.log(
      `%c Debug: %c${message}`,
      style.debug.type,
      style.debug.message,
      ...data
    );
  };

  http = (message, ...data) => {
    if (this.option.level < Levels.http) return;
    return this.log(
      `%c Http: %c${message}`,
      style.http.type,
      style.http.message,
      ...data
    );
  };

  api = (message, ...data) => {
    if (this.option.level < Levels.api) return;
    return this.log(
      `%c Api: %c${message}`,
      style.api.type,
      style.api.message,
      ...data
    );
  };

  service = (message, ...data) => {
    if (this.option.level < Levels.service) return;
    return this.log(
      `%c Service: %c${message}`,
      style.service.type,
      style.service.message,
      ...data
    );
  };

  interval = (message, ...data) => {
    if (this.option.level < Levels.interval) return;
    return this.log(
      `%c Interval: %c${message}`,
      style.interval.type,
      style.interval.message,
      ...data
    );
  };

  key = (keyName = "", ...data) => {
    if (this.option.level < Levels.key) return;
    return this.log(
      `%c Key: %c${keyName.toUpperCase()}`,
      style.key.type,
      style.key.message,
      ...data
    );
  };

  // 只在日志等级大于2时显示
  warn = (message, ...data) => {
    if (this.option.level < Levels.warn) return;
    return this.log(
      `%c WARN: %c${message}`,
      style.warn.type,
      style.warn.message,
      ...data
    );
  };

  error = (error = new Error(""), ...data) => {
    if (this.option.level < Levels.error) return;
    return this.log(
      `%c ERR: %c${error.stack}\n`,
      style.error.type,
      style.error.message,
      ...data
    );
  };

  version = (name = "", version, ...data) => {
    if (this.option.level < Levels.version) return;
    return this.log(
      `%c${name.toUpperCase()}%c${version}`,
      style.version.name,
      style.version.version,
      ...data
    );
  };
}

export default Logger;
