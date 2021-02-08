import theme from "../theme";
import slider from "./slider";

const shapes = {
  slider,
};

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

export const selectCss = ({ color }, shape = "slider", duty = "title") => {
  if (duty === "message_button") return shapes[shape][duty]();
  return shapes[shape][duty](color);
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
  shapes,
  css,
  selectCss,
  version,
};
export default style;
