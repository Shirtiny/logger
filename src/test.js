import ShLog from ".";
import { name, version } from "../package.json";

ShLog.logger.version(name, version, { level: 0 });
ShLog.logger.log("log", { level: 0 }, ", logger default options: ", ShLog.logger.option);
ShLog.logger.debug("debug message", { level: 4 });
ShLog.logger.http("req and rep", { level: 3 });
ShLog.logger.api("api message", { level: 3 });
ShLog.logger.service("service data", { level: 2 });
ShLog.logger.interval("interval task", { level: 1 });
ShLog.logger.key("ENTER", { level: 0 });
ShLog.logger.warn("warnning message", { level: 1 });
ShLog.logger.error(new Error("error message"), { level: 0 });
