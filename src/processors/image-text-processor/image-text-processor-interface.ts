import { TextBlock } from "@models/ocr/text-block";

/**
 * IImageProcessor
 * 
 * Defines the interface for processing an image.
 * Specifically, processing the text out of an image
 */
export interface IImageTextProcessor {
    process(base64Image: string, languageCode?: string): Promise<TextBlock[]>;
}

export const IImageTextProcessor: symbol = Symbol.for("IImageTextProcessor");