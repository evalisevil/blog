import { type TITLE_SEPARATORS } from '../constants/title-separator'

export type TitleSeparatorCharType = (typeof TITLE_SEPARATORS)[keyof typeof TITLE_SEPARATORS]
