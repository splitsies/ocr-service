import { IImageTextProcessor } from "../image-text-processor/image-text-processor-interface";

export interface ITextractImageTextProcessor extends IImageTextProcessor {}
export const ITextractImageTextProcessor = Symbol.for("ITextractImageTextProcessor");
