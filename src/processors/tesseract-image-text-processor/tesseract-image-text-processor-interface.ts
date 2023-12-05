import { IImageTextProcessor } from "../image-text-processor/image-text-processor-interface";

export interface ITesseractImageTextProcessor extends IImageTextProcessor {}
export const ITesseractImageTextProcessor = Symbol.for("ITesseractImageTextProcessor");
