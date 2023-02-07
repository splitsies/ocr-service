import { TextBlock } from "@models/ocr/text-block";
import { inject, injectable } from "inversify";
import { IOcrEngine } from "src/engines/ocr-engine/ocr-engine-interface";
import { IImageProcessor } from "./image-processor-interface";

@injectable()
export class ImageProcessor implements IImageProcessor {
    constructor(@inject(IOcrEngine) private readonly _ocrEngine: IOcrEngine) { }
    
    public async process(base64Image: string): Promise<TextBlock[]> {
        return await this._ocrEngine.recognize(base64Image);
    }
}