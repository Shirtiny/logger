import { Slider } from "./shape";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-23 17:21:45
 * @LastEditTime: 2021-06-24 22:56:47
 * @Description:
 */

export enum Colors {
  red = "#e72528",
  blue = "#2a79af",
  weakBlue = "#6eb6f4",
  geekblue = "#85a5ff",
  gold = "#ffd666",
  orange = "#ffa940",
  cyan = "#13c2c2",
  green = "#52c41a",
  volcano = "#fa541c",
  lime = "#389e0d",
  pink = "#eb2f96",
  purple = "#722ed1",
  darkPurple = "#292F4C",
  gray = "#8c8c8c",
}

export class Theme {
  colors: typeof Colors;
  shapes: {
    slider: Slider;
  };
  constructor() {
    this.colors = Colors;
    this.shapes = {
      slider: new Slider()
    }
  }
}
