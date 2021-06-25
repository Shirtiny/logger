import { Shape } from "./../style/shape";
import { BaseLogger, IBaseLoggerOption } from "./baseLogger";
import { Theme } from "./../style/theme";
import { ILog } from "./baseLogger";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-24 14:47:10
 * @LastEditTime: 2021-06-25 14:13:37
 * @Description:
 */

type LoggerOptionParam = {
  enable?: boolean;
  log?: ILog;
  level?: number;
  shape?: Shape;
};

class LoggerOption implements IBaseLoggerOption {
  enable?: boolean;
  log?: ILog;
  level?: number;
  shape?: Shape;

  constructor(param?: LoggerOptionParam) {
    const defaultOptionParam = {
      enable: true,
      log: window.console.log,
      // miku!
      level: 39,
      shape: new Theme().shapes.slider,
    };

    this.enable =
      param && typeof param.enable === "boolean"
        ? param.enable
        : defaultOptionParam.enable;
    this.log = (param && param.log) || defaultOptionParam.log;
    this.level =
      param && typeof param.level === "number"
        ? param.level
        : defaultOptionParam.level;
    this.shape = param && param.shape ? param.shape : defaultOptionParam.shape;
  }
}

export class Logger extends BaseLogger {
  private loggerOption: LoggerOption;

  constructor(options?: LoggerOption) {
    super(options || new LoggerOption());
    this.loggerOption = { ...new LoggerOption(), ...options };
  }

  setLoggerOption(option: object) {
    const newOption: LoggerOption = { ...this.loggerOption, ...option };
    this.loggerOption = newOption;
    super.baseOption = { enable: newOption.enable, log: newOption.log };
  }

  getLoggerOption() {
    return this.loggerOption;
  }

  setLevel(level: number) {
    if (typeof level !== "number") return;
    this.loggerOption.level = level;
  }

  formatLog(
    level: number,
    title: string,
    message: string,
    titleCss: string,
    messageCss: string,
    ...data: any[]
  ) {
    if (!this.loggerOption.level && this.loggerOption.level !== 0) return;
    if (this.loggerOption.level < level) return;
    super.log(`%c${title}%c${message}`, titleCss, messageCss, ...data);
  }
}

export default Logger;
