import { TextBlock } from "@models/ocr/text-block";

export interface IImageService {
    processImage(base64EncodedImg: string): Promise<TextBlock[]>;
}

export const IImageService: symbol = Symbol.for("IImageService");