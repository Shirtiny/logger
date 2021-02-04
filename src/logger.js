import { css } from "./common";
import theme from "./theme";

// logger type 的样式
const typeStyle = (color) => css`
  color: ${color};
  border-left: 3px solid ${color};
  padding: 2px;
  font-weight: 600;
`;

let consoleLog = localStorage.getItem("consoleLog") || "on";

console.warn = () => {};

function setConsoleLog(islog) {
  consoleLog = islog ? "on" : "off";
  localStorage.setItem("consoleLog", consoleLog);
}

function getConsoleLogBoolean() {
  return consoleLog === "on";
}

function log(...message) {
  return consoleLog === "on" && console.log("logger: ", ...message);
}

const errorMessageStyle = css`
  color: ${theme.red};
`;

function error(data, ...message) {
  return (
    consoleLog === "on" &&
    console.log(
      `%c ERROR:  %c${message.join("")}`,
      typeStyle(theme.red),
      errorMessageStyle,
      data
    )
  );
}

const httpMessageStyle = css`
  color: ${theme.weakBlue};
`;

function http(data, ...message) {
  return (
    consoleLog === "on" &&
    console.log(
      `%c HTTP: %c${message.join("")}`,
      typeStyle(theme.weakBlue),
      httpMessageStyle,
      data
    )
  );
}
const intervalMessageStyle = css`
  color: ${theme.pink};
`;

function interval(data, ...message) {
  return (
    consoleLog === "on" &&
    console.log(
      `%c Interval: %c${message.join("")}`,
      typeStyle(theme.pink),
      intervalMessageStyle,
      data
    )
  );
}

const dataMessageStyle = css`
  color: ${theme.purple};
`;

function data(data, ...message) {
  return (
    consoleLog === "on" &&
    console.log(
      `%c Data: %c${message.join("")}`,
      typeStyle(theme.purple),
      dataMessageStyle,
      data
    )
  );
}

const keyMessageStyle = css`
  background-color: ${theme.darkPurple};
  color: #eee;
  padding: 2px 5px;
  border-radius: 3px;
  text-shadow: 0 0 2px #fff;
`;

function key(...message) {
  return (
    consoleLog === "on" &&
    console.log(
      `%c KEY: %c${message.join("").toUpperCase()}`,
      typeStyle(theme.darkPurple),
      keyMessageStyle
    )
  );
}

// 打印版本
const appNameStyle = css`
  background-color: #5f5f5f;
  color: white;
  padding: 1px 6px;
`;

const versionStyle = css`
  background-color: #4bc729;
  color: white;
  padding: 1px 6px;
`;

function version() {
  console.log(
    `%c version %c${process.env.REACT_APP_NAME.toUpperCase()}%c${
      process.env.REACT_APP_VERSION
    }`,
    "",
    appNameStyle,
    versionStyle
  );
}

export default {
  log,
  error,
  data,
  http,
  interval,
  key,
  version,
  setConsoleLog,
  getConsoleLogBoolean,
};
