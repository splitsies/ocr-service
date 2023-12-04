import { inject, injectable } from "inversify";
import { IOcrManager } from "./ocr-manager-interface";
import { ITextBlock } from "@splitsies/shared-models";
import { IImageTextProcessorProvider } from "src/providers/image-text-processor-provider/image-text-processor-provider-interface";

@injectable()
export class OcrManager implements IOcrManager {
    constructor(
        @inject(IImageTextProcessorProvider) private readonly _imageProcessorProvider: IImageTextProcessorProvider,
    ) {}

    public async recognize(base64Image: string, languageCode = "eng"): Promise<ITextBlock[]> {
        const textProcessor = this._imageProcessorProvider.provide();
        return textProcessor.process(base64Image, languageCode);
    }
}
