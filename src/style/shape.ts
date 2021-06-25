import { Colors } from './theme';
import { css } from "./index";
/*
 * @Author: Shirtiny
 * @Date: 2021-06-24 16:58:31
 * @LastEditTime: 2021-06-24 22:58:01
 * @Description:
 */

export interface Shape {
  title(color?: string): string;
  message(color?: string): string;
  message_button(
    color?: string,
    bgColor?: string,
    shadowColor?: string,
  ): string;
}

export class Slider implements Shape {
  constructor() {}

  title(color: string = ""): string {
    return css`
      color: ${color};
      border-left: 3px solid ${color};
      padding: 2px;
      font-weight: 600;
    `;
  }

  message(color: string = ""): string {
    return css`
      color: ${color};
    `;
  }

  message_button(
    color: string = "#eee",
    bgColor: string = Colors.darkPurple,
    shadowColor: string = "#fff",
  ): string {
    return css`
      background-color: ${bgColor};
      color: ${color};
      padding: 2px 5px;
      border-radius: 3px;
      text-shadow: 0 0 2px ${shadowColor};
    `;
  }
}
