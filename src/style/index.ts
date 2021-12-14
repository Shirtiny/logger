import { Shape, Slider } from "./shape";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-23 16:31:16
 * @LastEditTime: 2021-12-14 15:21:11
 * @Description:
 */

type Text = string | number;

const line = (str?: string) => {
  return str ? str.replace(/\s*(;|\{|\})+\s*[\n\r]*/g, "$1") : "";
};

export const css = (literals: TemplateStringsArray, ...values: Text[]) => {
  // 模板字符串无变量时 values为空数组 literals数组只有一个值 是模版字符串本身
  if (!values.length) {
    return line(literals[0]);
  }
  let cssStr: string = "";

  values.forEach((value, index) => {
    cssStr += literals[index] + value;
  });
  // literals总比values多一个 遍历values完毕后 还剩一个literal没有加上
  cssStr += literals[literals.length - 1];
  return line(cssStr);
};

type cssParam = {
  color?: string;
};

export enum DUTY {
  title = 1,
  message = 2,
  message_button = 3,
}

export const selectCss = (
  { color }: cssParam,
  shape: Shape = new Slider(),
  duty: DUTY,
): string => {
  switch (duty) {
    case DUTY.title: {
      return shape.title(color);
    }
    case DUTY.message: {
      return shape.message(color);
    }
    case DUTY.message_button: {
      return shape.message_button();
    }
    default: {
      return "";
    }
  }
};
