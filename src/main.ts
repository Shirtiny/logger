/*
 * @Author: Shirtiny
 * @Date: 2021-06-11 10:01:14
 * @LastEditTime: 2021-09-15 16:13:52
 * @Description:
 */
import { LEVELS, ShLogger } from "./model/shLogger";
import { Logger } from "./model/logger";
import { css } from "./style/index";
import { Theme } from "./style/theme";

const theme = new Theme();

const sh_log = new ShLogger();

export { theme, ShLogger, css, Logger, LEVELS };

export default sh_log;
