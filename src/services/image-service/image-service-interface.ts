import { ITextBlock } from "@splitsies/shared-models";

export interface IImageService {
    processImage(base64EncodedImg: string): Promise<ITextBlock[]>;
}

export const IImageService: symbol = Symbol.for("IImageService");