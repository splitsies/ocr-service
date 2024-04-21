import { OcrResult, IExpenseDto } from "@splitsies/shared-models";
import { inject, injectable } from "inversify";
import { IImageService } from "./image-service-interface";
import { IOcrManager } from "src/managers/ocr-manager/ocr-manager-interface";
import { IAlgorithmsApiClient } from "src/api/algorithms-api-client/algorithms-api-client-interface";

@injectable()
export class ImageService implements IImageService {
    constructor(
        @inject(IOcrManager) private readonly _ocrEngine: IOcrManager,
        @inject(IAlgorithmsApiClient) private readonly _algorithmsApiClient: IAlgorithmsApiClient,
    ) {}

    public async processImage(base64EncodedImg: string): Promise<IExpenseDto> {
        const blocks = await this._ocrEngine.recognize(base64EncodedImg);
        const result = new OcrResult(blocks);

        console.log({ result });

        const expense = await this._algorithmsApiClient.processImage(result);

        console.log({ expense });
        return expense.data;
    }
}
