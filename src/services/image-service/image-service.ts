import { OcrResult, IExpenseDto } from "@splitsies/shared-models";
import { inject, injectable } from "inversify";
import { IImageService } from "./image-service-interface";
import { IOcrManager } from "src/managers/ocr-manager/ocr-manager-interface";
import { IImageExpenseProcessor } from "@splitsies/algorithms";

@injectable()
export class ImageService implements IImageService {
    constructor(
        @inject(IOcrManager) private readonly _ocrEngine: IOcrManager,
        @inject(IImageExpenseProcessor) private readonly _imageExpenseProcessor: IImageExpenseProcessor,
    ) {}

    public async processImage(base64EncodedImg: string): Promise<IExpenseDto> {
        const blocks = await this._ocrEngine.recognize(base64EncodedImg);
        const result = new OcrResult(blocks);

        const expense = this._imageExpenseProcessor.process(result);
        return expense;
    }
}
