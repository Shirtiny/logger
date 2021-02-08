import { css } from ".";
import theme from "../theme";

// logger 滑块类型 的样式
const title = (color) => css`
  color: ${color};
  border-left: 3px solid ${color};
  padding: 2px;
  font-weight: 600;
`;

const message = (color) => css`
  color: ${color};
`;

const message_button = (
  color = "#eee",
  bgColor = theme.darkPurple,
  shadowColor = "#fff"
) => css`
  background-color: ${bgColor};
  color: ${color};
  padding: 2px 5px;
  border-radius: 3px;
  text-shadow: 0 0 2px ${shadowColor};
`;

const slider = {
  title,
  message,
  message_button,
};

export default slider;
