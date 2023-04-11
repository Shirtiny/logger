import { Shape } from "./../style/shape";
import {
  BaseLogger,
  IBaseLoggerOption,
  ILogGroup,
  ILogGroupEnd,
  ILogTime,
  ILogTimeStep,
  ILogTimeEnd,
  ILogTrace,
} from "./baseLogger";
import { Theme } from "./../style/theme";
import { ILog } from "./baseLogger";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-24 14:47:10
 * @LastEditTime: 2021-12-11 11:12:12
 * @Description:
 */

export type TitlePairs = { str: string; style?: string }[];

export type LoggerOptionParam = {
  enable?: boolean;

  // TODO: console adapter console方法由adapter实现
  log?: ILog;
  logGroup?: ILogGroup;
  logGroupCollapsed?: ILogGroup;
  logGroupEnd?: ILogGroupEnd;
  logTime?: ILogTime;
  logTimeStep?: ILogTimeStep;
  logTimeEnd?: ILogTimeEnd;
  logTrace?: ILogTrace;

  level?: number;
  shape?: Shape;
  isCollapsed?: boolean;
};

export class LoggerOption implements IBaseLoggerOption {
  enable?: boolean;
  log?: ILog;
  logGroup?: ILogGroup;
  logGroupCollapsed?: ILogGroup;
  logGroupEnd?: ILogGroupEnd;
  logTime?: ILogTime;
  logTimeStep?: ILogTimeStep;
  logTimeEnd?: ILogTimeEnd;
  logTrace?: ILogTrace;
  level?: number;
  shape?: Shape;
  isCollapsed?: boolean;

  constructor(param?: LoggerOptionParam) {
    const defaultOptionParam = {
      enable: true,
      log: (...args: any[]) => window?.console?.log(...args),
      logGroup: (...label: any[]) => window?.console?.group(...label),
      logGroupCollapsed: (...label: any[]) =>
        window?.console?.groupCollapsed(...label),
      logGroupEnd: () => window?.console?.groupEnd(),
      logTime: (label?: string) => window?.console?.time(label),
      logTimeStep: (label?: string, ...data: any[]) =>
        window?.console?.timeLog(label, ...data),
      logTimeEnd: (label?: string) => window?.console?.timeEnd(label),
      logTrace: (...data: any[]) => window?.console?.trace(...data),
      // miku!
      level: 39,
      shape: new Theme().shapes.slider,
      isCollapsed: true,
    };

    this.enable =
      param && typeof param.enable === "boolean"
        ? param.enable
        : defaultOptionParam.enable;
    this.log = (param && param.log) || defaultOptionParam.log;
    this.logGroup = (param && param.logGroup) || defaultOptionParam.logGroup;
    this.logGroupCollapsed =
      (param && param.logGroupCollapsed) ||
      defaultOptionParam.logGroupCollapsed;
    this.logGroupEnd =
      (param && param.logGroupEnd) || defaultOptionParam.logGroupEnd;
    this.logTime = (param && param.logTime) || defaultOptionParam.logTime;
    this.logTimeStep =
      (param && param.logTimeStep) || defaultOptionParam.logTimeStep;
    this.logTimeEnd =
      (param && param.logTimeEnd) || defaultOptionParam.logTimeEnd;
    this.logTrace = (param && param.logTrace) || defaultOptionParam.logTrace;

    this.level =
      param && typeof param.level === "number"
        ? param.level
        : defaultOptionParam.level;
    this.shape = param && param.shape ? param.shape : defaultOptionParam.shape;
    this.isCollapsed =
      param && param.isCollapsed
        ? param.isCollapsed
        : defaultOptionParam.isCollapsed;
  }
}

export class Logger extends BaseLogger {
  private loggerOption: LoggerOption;

  constructor(options?: LoggerOption) {
    const option = new LoggerOption(options);
    super(option);
    this.loggerOption = option;
  }

  setLoggerOption(option: object) {
    const newOption: LoggerOption = { ...this.loggerOption, ...option };
    this.loggerOption = newOption;
    super.baseOption = {
      enable: newOption.enable,
      log: newOption.log,
      logGroup: newOption.isCollapsed
        ? newOption.logGroupCollapsed
        : newOption.logGroup,
      logGroupEnd: newOption.logGroupEnd,
      logTime: newOption.logTime,
      logTimeEnd: newOption.logTimeEnd,
      logTrace: newOption.logTrace,
    };
  }

  getLoggerOption() {
    return this.loggerOption;
  }

  setLevel(level: number) {
    if (typeof level !== "number") return;
    this.loggerOption.level = level;
  }

  isLevelAllowed(level: number) {
    if (!this.loggerOption.level && this.loggerOption.level !== 0) return false;
    if (this.loggerOption.level < level) return false;
    return true;
  }

  protected customFormat(level: number, pairs: TitlePairs, ...data: any[]) {
    if (!this.isLevelAllowed(level)) return;
    const content = "%c" + pairs.map((p) => p.str).join("%c");
    const descStyles = pairs.map((p) => p.style);
    this.log(content, ...descStyles, ...data);
  }

  protected formatLog(
    level: number,
    title: string,
    message: string,
    titleCss: string,
    messageCss: string,
    ...data: any[]
  ) {
    if (!this.isLevelAllowed(level)) return;
    this.log(`%c${title}%c${message}`, titleCss, messageCss, ...data);
  }

  protected formatGroup(
    level: number,
    label: string | TitlePairs,
    logs: () => void,
  ) {
    if (!this.isLevelAllowed(level)) return;
    if (Array.isArray(label)) {
      const title = "%c" + label.map((p) => p.str).join("%c");
      const descStyles = label.map((p) => p.style);
      this.logGroup(title, ...descStyles);
    } else {
      this.logGroup(String(label));
    }

    logs();
    this.logGroupEnd();
  }

  protected async formatTiming(
    level: number,
    label: string,
    logs: (step: (...data: any[]) => void) => any,
    stepSplit: string = "<---",
  ) {
    if (!this.isLevelAllowed(level)) return;
    this.logTime(label);

    await logs((...data: any[]) => {
      this.logTimeStep(label, stepSplit, ...data);
    });
    this.logTimeEnd(label);
  }

  protected formatTrace(level: number, ...data: any[]) {
    if (!this.isLevelAllowed(level)) return;
    this.logTrace(...data);
  }
}

export default Logger;
