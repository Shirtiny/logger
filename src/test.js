import { Logger, css } from ".";
import { name, version } from "../package.json";

const customLogsCreater = (log, option) => {
  return {
    custom: (message, ...data) => {
      // level
      if (option.level < 2) return;
      //   log
      return log(
        `%c Custom %c${message}`,
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
          font-family: 'Trebuchet MS';
        `,
        ...data
      );
    },
  };
};
const logger = new Logger({ level: 2 }, customLogsCreater);

logger.version(name, version, { level: 0 });
logger.log("log", { level: 0 }, ", logger default options: ", logger.option);
logger.debug("debug message", { level: 4 });
logger.http("req and rep", { level: 3 });
logger.api("api message", { level: 3 });
logger.service("service data", { level: 2 });
logger.interval("interval task", { level: 1 });
logger.key("ENTER", { level: 0 });
logger.warn("warnning message", { level: 1 });
logger.error(new Error("error message"), { level: 0 });
logger.custom("my custom log");
