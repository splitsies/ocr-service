import { TextBlock } from "@models/ocr/text-block";

/**
 * IImageProcessor
 * 
 * Defines the interface for processing an image.
 * Specifically, processing the text out of an image
 */
export interface IImageProcessor {
    process(base64Image: string): Promise<TextBlock[]>;
}

export const IImageProcessor: symbol = Symbol.for("IImageProcessor");