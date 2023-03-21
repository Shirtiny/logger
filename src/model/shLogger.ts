/*
 * @Author: Shirtiny
 * @Date: 2021-06-25 10:25:33
 * @LastEditTime: 2022-02-17 21:47:39
 * @Description:
 */

import { css, selectCss, DUTY } from "../style/index";
import { Colors } from "../style/theme";
import { Logger } from "./logger";

const read = (exec: (reader: FileReader) => void): Promise<any> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    exec && exec(reader);
  });
};

export enum LEVELS {
  log = 0,
  version = 0,
  repo = 0,
  img = 0,
  error = 1,
  warn = 2,
  key = 3,
  interval = 3,
  service = 4,
  api = 5,
  http = 6,
  debug = 7,
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
  protected formatShapeLog(
    {
      level,
      title,
      color,
    }: {
      level: number;
      title: string;
      color: string;
    },
    message: string,
    ...data: any[]
  ) {
    this.formatLog(
      level,
      title,
      message,
      selectCss({ color }, this.getLoggerOption().shape, DUTY.title),
      selectCss({ color }, this.getLoggerOption().shape, DUTY.message),
      ...data,
    );
  }

  debug(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.debug, message, ...data);
  }

  http(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.http, message, ...data);
  }

  api(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.api, message, ...data);
  }

  service(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.service, message, ...data);
  }

  interval(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.interval, message, ...data);
  }

  warn(message: string, ...data: any[]) {
    this.formatShapeLog(logTypes.warn, message, ...data);
  }

  error = (error: any, ...data: any[]) => {
    this.formatShapeLog(
      logTypes.error,
      `${error instanceof Error ? error.stack : error}\n`,
      ...data,
    );
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

  repo = (desc: string, ...data: any[]) => {
    this.customFormat(
      LEVELS.repo,
      [
        {
          str: "REP",
          style: css`
            background-color: green;
            color: white;
            padding: 2px 5px;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-right: none;
          `,
        },
        {
          str: desc,
          style: css`
            background-color: #fff;
            color: #333;
            padding: 2px 5px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            border: 1px solid rgba(0, 0, 0, 0.06);
            border-left: none;
          `,
        },
      ],
      ...data,
    );
  };

  img = async (src: string, style: string = "") => {
    let url = src;

    if (!String(src).includes("blob")) {
      const blob = await (await fetch(src)).blob();
      url = await read((reader) => {
        reader.readAsDataURL(blob);
      });
    }

    this.customFormat(LEVELS.img, [
      // https://giphy.com/explore/console
      {
        str: " ",
        style: css`
          margin-left: 8px;
          padding: 15px;
          color: transparent;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url(${url});
          ${style}
        `,
      },
    ]);
  };

  unionVersion = async (
    name: string,
    tag: string,
    sha: string,
    imageParams: null | { src: string; style?: string },
    ...data: any[]
  ) => {
    let url = imageParams?.src;

    if (url && !String(url).includes("blob")) {
      const blob = await (await fetch(url)).blob();
      url = await read((reader) => {
        reader.readAsDataURL(blob);
      });
    }

    const arr = [
      {
        str: String(name).toUpperCase(),
        style: css`
          background: linear-gradient(to right, #009fff, #ec2f4b);
          color: white;
          padding: 2px 5px;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        `,
      },
      {
        str: tag,
        style: css`
          background-color: #292f4c;
          color: white;
          padding: 2px 5px;
          margin-right: 8px;
        `,
      },
      {
        str: "REP",
        style: css`
          background-color: green;
          color: white;
          padding: 2px 5px;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-right: none;
        `,
      },
      {
        str: sha,
        style: css`
          background-color: #fff;
          color: #333;
          padding: 2px 5px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-left: none;
        `,
      },
    ];

    if (url) {
      arr.push(
        // https://giphy.com/explore/console
        {
          str: " ",
          style: css`
            margin-left: 8px;
            padding: 15px;
            color: transparent;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(${url});
            ${imageParams?.style || ""}
          `,
        },
      );
    }

    this.customFormat(LEVELS.version, arr, ...data);
  };
}
