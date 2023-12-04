import { IImageTextProcessor } from "@processors/image-text-processor/image-text-processor-interface";

export interface IImageTextProcessorProvider {
    provide(): IImageTextProcessor;
}

export const IImageTextProcessorProvider = Symbol.for("IImageTextProcessorProvider");
