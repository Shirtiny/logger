import style, { selectCss } from "../style";
import theme from "../theme";
import Console from "./console";

const DefaultOption = {
  console: window.console,
  enable: true,
  level: 4,
};

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

const TypesMap = new Map([
  [
    "debug",
    {
      name: "debug",
      title: " Debug ",
      color: theme.lime,
      level: Levels.debug,
    },
  ],
  [
    "http",
    {
      name: "http",
      title: " Http ",
      color: theme.weakBlue,
      level: Levels.http,
    },
  ],
  [
    "api",
    {
      name: "api",
      title: " Api ",
      color: theme.cyan,
      level: Levels.api,
    },
  ],
  [
    "service",
    {
      name: "service",
      title: " Service ",
      color: theme.purple,
      level: Levels.service,
    },
  ],
  [
    "interval",
    {
      name: "interval",
      title: " Interval ",
      color: theme.pink,
      level: Levels.interval,
    },
  ],
  [
    "warn",
    {
      name: "warn",
      title: " WARN ",
      color: theme.orange,
      level: Levels.warn,
    },
  ],
]);

const Types = Array.from(TypesMap.values());

console.log(Types);

class Logger extends Console {
  constructor(option = DefaultOption, customLogs = (log, option) => {}) {
    super(option);

    for (const type of Types) {
      this[type.name] = (message, ...data) => {
        if (this.option.level < type.level) return;
        return this.log(
          `%c${type.title}:%c${message}`,
          selectCss({ color: type.color }, "slider", "title"),
          selectCss({ color: type.color }, "slider", "message"),
          ...data
        );
      };
    }

    const coustoms = customLogs(this.log, this.option);
    for (const key in coustoms) {
      if (Object.hasOwnProperty.call(coustoms, key)) {
        this[key] = coustoms[key];
      }
    }
  }

  key = (keyName = "", ...data) => {
    if (this.option.level < Levels.key) return;
    return this.log(
      `%c Key: %c${keyName.toUpperCase()}`,
      selectCss({ color: theme.darkPurple }, "slider", "title"),
      selectCss({}, "slider", "message_button"),
      ...data
    );
  };

  error = (error = new Error(""), ...data) => {
    if (this.option.level < Levels.error) return;
    return this.log(
      `%c ERR: %c${error.stack}\n`,
      selectCss({ color: theme.red }, "slider", "title"),
      selectCss({ color: theme.red }, "slider", "message"),
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
