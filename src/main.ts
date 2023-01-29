/*
 * @Author: Shirtiny
 * @Date: 2021-06-11 10:01:14
 * @LastEditTime: 2021-12-11 11:41:23
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
