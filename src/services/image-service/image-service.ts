import { ITextBlock } from "@splitsies/shared-models";
import { inject, injectable } from "inversify";
import { IImageService } from "./image-service-interface";
import { IOcrEngine } from "@engines/ocr-engine/ocr-engine-interface";

@injectable()
export class ImageService implements IImageService {
    constructor(@inject(IOcrEngine) private readonly _ocrEngine: IOcrEngine) {}

    public async processImage(base64EncodedImg: string): Promise<ITextBlock[]> {
        return this._ocrEngine.recognize(base64EncodedImg);
    }
}
