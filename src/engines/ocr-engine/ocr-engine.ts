import { inject, injectable } from "inversify";
import { IOcrEngine } from "./ocr-engine-interface";
import { ITextBlock } from "@splitsies/shared-models";
import { IImageTextProcessor } from "@processors/image-text-processor/image-text-processor-interface";

/**
 * Coordinator for OCR functionality using Tesseract.js
 * API docs - https://github.com/naptha/tesseract.js/blob/master/docs/api.md#api
 */
@injectable()
export class OcrEngine implements IOcrEngine {
    constructor(@inject(IImageTextProcessor) private readonly _imageProcessor: IImageTextProcessor) {}

    public async recognize(base64Image: string, languageCode = "eng"): Promise<ITextBlock[]> {
        return this._imageProcessor.process(base64Image, languageCode);
    }
}