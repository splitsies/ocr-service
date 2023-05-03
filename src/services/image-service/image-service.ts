import { OcrResult, IOcrResult } from "@splitsies/shared-models";
import { inject, injectable } from "inversify";
import { IImageService } from "./image-service-interface";
import { IOcrManager } from "src/managers/ocr-manager/ocr-manager-interface";

@injectable()
export class ImageService implements IImageService {
    constructor(@inject(IOcrManager) private readonly _ocrEngine: IOcrManager) {}

    public async processImage(base64EncodedImg: string): Promise<IOcrResult> {
        const blocks = await this._ocrEngine.recognize(base64EncodedImg);
        return new OcrResult(blocks);
    }
}
