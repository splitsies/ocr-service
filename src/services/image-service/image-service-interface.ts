import { IOcrResult } from "@splitsies/shared-models";

export interface IImageService {
    processImage(base64EncodedImg: string): Promise<IOcrResult>;
}

export const IImageService: symbol = Symbol.for("IImageService");
