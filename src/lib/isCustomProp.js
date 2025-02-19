import { includesKeywords } from "./includesKeyWords"
import { isFirstUpperCase } from "./isFirstUpperCase"

export const isCustomProp = (text) => !isFirstUpperCase(text) && !includesKeywords(text)