/*
 * @Author: Shirtiny
 * @Date: 2021-06-23 17:40:43
 * @LastEditTime: 2021-06-25 14:09:45
 * @Description:
 */

export interface ILog {
  (...data: any[]): void;
}

export interface ILogGroup {
  (...label: any[]): void;
}

export interface ILogGroupEnd {
  (): void;
}

export interface ILogTime {
  (label?: string): void;
}

export interface ILogTimeStep {
  (label?: string, ...data: any[]): void;
}

export interface ILogTimeEnd {
  (label?: string): void;
}

export interface ILogTrace {
  (...data: any[]): void;
}

export interface IBaseLoggerOption {
  enable?: boolean;
  log?: ILog;
  logGroup?: ILogGroup;
  logGroupEnd?: ILogGroupEnd;
  logTime?: ILogTime;
  logTimeStep?: ILogTimeStep;
  logTimeEnd?: ILogTimeEnd;
  logTrace?: ILogTrace;
}

export interface ILogger {
  log: ILog;
  logGroup: ILogGroup;
  logGroupEnd: ILogGroupEnd;
  logTime: ILogTime;
  logTimeStep: ILogTimeStep;
  logTimeEnd: ILogTimeEnd;
  logTrace: ILogTrace;
}

export class BaseLogger implements ILogger {
  private _option: IBaseLoggerOption;

  constructor(option?: IBaseLoggerOption) {
    this._option = {
      enable: typeof option?.enable === "boolean" ? option.enable : true,
      log: option?.log,
      logGroup: option?.logGroup,
      logGroupEnd: option?.logGroupEnd,
      logTime: option?.logTime,
      logTimeStep: option?.logTimeStep,
      logTimeEnd: option?.logTimeEnd,
      logTrace: option?.logTrace,
    };
  }

  log(...data: any[]): void {
    const { enable, log } = this._option;
    enable && log && log(...data);
  }

  logGroup(...label: any[]): void {
    const { enable, logGroup } = this._option;
    enable && logGroup && logGroup(...label);
  }

  logGroupEnd() {
    const { enable, logGroupEnd } = this._option;
    enable && logGroupEnd && logGroupEnd();
  }

  logTime(label?: string): void {
    const { enable, logTime } = this._option;
    enable && logTime && logTime(label);
  }

  logTimeStep(label?: string, ...data: any[]): void {
    const { enable, logTimeStep } = this._option;
    enable && logTimeStep && logTimeStep(label, ...data);
  }

  logTimeEnd(label?: string) {
    const { enable, logTimeEnd } = this._option;
    enable && logTimeEnd && logTimeEnd(label);
  }

  logTrace(...data: any[]) {
    const { enable, logTrace } = this._option;
    enable && logTrace && logTrace(...data);
  }

  set baseOption(option: IBaseLoggerOption) {
    this._option = option;
  }

  get baseOption(): IBaseLoggerOption {
    return this._option;
  }

  setEnable(enable?: boolean) {
    this._option.enable = !!enable;
  }
}
