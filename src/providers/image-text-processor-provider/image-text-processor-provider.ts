import { IOcrConfiguration } from "@models/configuration/ocr-configuration/ocr-configuration-interface";
import { IImageTextProcessor } from "@processors/image-text-processor/image-text-processor-interface";
import { ITesseractImageTextProcessor } from "@processors/tesseract-image-text-processor/tesseract-image-text-processor-interface";
import { ITextractImageTextProcessor } from "@processors/textract-image-text-processor/textract-image-text-processor-interface";
import { inject, injectable } from "inversify";
import { IImageTextProcessorProvider } from "./image-text-processor-provider-interface";

@injectable()
export class ImageTextProcessorProvider implements IImageTextProcessorProvider {
    constructor(
        @inject(IOcrConfiguration) private readonly _ocrConfiguration: IOcrConfiguration,
        @inject(ITextractImageTextProcessor) private readonly _textractImageTextProcessor: ITextractImageTextProcessor,
        @inject(ITesseractImageTextProcessor)
        private readonly _tesseractImageTextProcessor: ITesseractImageTextProcessor,
    ) {}

    provide(): IImageTextProcessor {
        switch (this._ocrConfiguration.ocrEngine) {
            case "textract":
                return this._textractImageTextProcessor;
            default:
                return this._tesseractImageTextProcessor;
        }
    }
}
