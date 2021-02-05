import theme from "./theme";

/**
 * 自定css 为了使用vscode的s-c扩展
 * @param {Array} literals 模板字符串数组 模板字符串无变量时 只有1项字符串
 * @param  {...String} values 模版字符串的变量值
 */
export const css = (literals, ...values) => {
  // console.log(literals, values, values.length);
  // 模板字符串无变量时 values为空数组 literals数组只有一个值 是模版字符串本身
  if (values.length === 0) {
    return literals[0];
  }
  let cssStr = "";
  // 遍历values
  values.forEach((value, index) => {
    cssStr += literals[index] + value;
  });
  // literals总比values多一个 遍历values完毕后 还剩一个literal没有加上
  cssStr += literals[literals.length - 1];
  // console.log(cssStr);
  return cssStr;
};

// logger type 的样式
export const typeCss = (color) => css`
  color: ${color};
  border-left: 3px solid ${color};
  padding: 2px;
  font-weight: 600;
`;

// debug log的样式
export const debug = {
  type: typeCss(theme.lime),
  message: css`
    color: ${theme.lime};
  `,
};

// http log的样式
export const http = {
  type: typeCss(theme.weakBlue),
  message: css`
    color: ${theme.weakBlue};
  `,
};

// api log的样式
export const api = {
  type: typeCss(theme.cyan),
  message: css`
    color: ${theme.cyan};
  `,
};

// service log的样式
export const service = {
  type: typeCss(theme.purple),
  message: css`
    color: ${theme.purple};
  `,
};

// interval log的样式
export const interval = {
  type: typeCss(theme.pink),
  message: css`
    color: ${theme.pink};
  `,
};

// key log的样式
export const key = {
  type: typeCss(theme.darkPurple),
  message: css`
    background-color: ${theme.darkPurple};
    color: #eee;
    padding: 2px 5px;
    border-radius: 3px;
    text-shadow: 0 0 2px #fff;
  `,
};

// warn log的样式
export const warn = {
  type: typeCss(theme.orange),
  message: css`
    color: ${theme.orange};
  `,
};

// error log的样式
export const error = {
  type: typeCss(theme.red),
  message: css`
    color: ${theme.red};
  `,
};

// version log的样式
export const version = {
  name: css`
    background: linear-gradient(to right, #009fff, #ec2f4b);
    color: white;
    padding: 2px 5px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  `,
  version: css`
    background-color: ${theme.darkPurple};
    color: white;
    padding: 2px 5px;
  `,
};

const style = {
  css,
  typeCss,
  debug,
  http,
  api,
  service,
  interval,
  key,
  warn,
  error,
  version,
};
export default style;
