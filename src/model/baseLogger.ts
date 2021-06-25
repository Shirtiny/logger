/*
 * @Author: Shirtiny
 * @Date: 2021-06-23 17:40:43
 * @LastEditTime: 2021-06-25 14:09:45
 * @Description:
 */

export interface ILog {
  (...data: any[]): void;
}

export interface IBaseLoggerOption {
  enable?: boolean;
  log?: ILog;
}

export interface ILogger {
  log: ILog;
}

export class BaseLogger implements ILogger {
  private _option: IBaseLoggerOption;

  constructor(option?: IBaseLoggerOption) {
    const DefaultOption: IBaseLoggerOption = {
      log: window.console.log,
      enable: true,
    };

    this._option = {
      ...DefaultOption,
      enable:
        typeof option?.enable === "boolean"
          ? option.enable
          : DefaultOption.enable,
      log: option?.log || DefaultOption.log,
    };
  }

  log(...data: any[]): void {
    const { enable, log } = this._option;
    enable && log && log(...data);
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
