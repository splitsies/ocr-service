import { TextBlock } from "@models/ocr/text-block";
import { inject, injectable } from "inversify";
import { IImageService } from "./image-service-interface";
import { IOcrEngine } from "@engines/ocr-engine/ocr-engine-interface";

@injectable()
export class ImageService implements IImageService {

    constructor(@inject(IOcrEngine) private readonly _ocrEngine: IOcrEngine) { }

    public async processImage(base64EncodedImg: string): Promise<TextBlock[]> {
        return this._ocrEngine.recognize(base64EncodedImg);
    }
}