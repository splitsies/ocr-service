import { ITextBlock } from "@splitsies/shared-models";

/**
 * IImageProcessor
 * 
 * Defines the interface for processing an image.
 * Specifically, processing the text out of an image
 */
export interface IImageTextProcessor {
    process(base64Image: string, languageCode?: string): Promise<ITextBlock[]>;
}

export const IImageTextProcessor: symbol = Symbol.for("IImageTextProcessor");