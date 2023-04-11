/*
 * @Author: Shirtiny
 * @Date: 2021-06-11 10:01:14
 * @LastEditTime: 2021-12-11 11:41:23
 * @Description:
 */
import { LEVELS, ShLogger } from "./model/shLogger";
import { Logger, LoggerOption, LoggerOptionParam } from "./model/logger";
import { css } from "./style/index";
import { Theme } from "./style/theme";
const theme = new Theme();

const logger = new ShLogger();

const request = () => {
  return new Promise((r) => {
    setTimeout(() => {
      r("ok");
    }, 300);
  });
};

const run = () => {
  logger.group("logger", () => {
    logger.version("app-name", "1.1.2", { level: LEVELS.version });

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
  });
};

logger.timing("run logger test", async (step) => {
  step("run step start");
  run();
  const res = await request();
  step("run step",["any data"], { res });
  logger.trace("test for trace", { a: "any data" });
  step("run step end");
});
