import { inject, injectable } from "inversify";
import { createWorker } from "tesseract.js";
import { ITesseractBlockMapper } from "../../mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { ITextBlock } from "@splitsies/shared-models";
import { IImageFormatMapper } from "../../mappers/image/image-format-mapper-interface";
import { ILogger } from "@splitsies/utils";
import { ITesseractImageTextProcessor } from "./tesseract-image-text-processor-interface";
import { ITesseractConfiguration } from "../../models/configuration/tesseract-configuration/tesseract-configuration-interface";

@injectable()
export class TesseractImageTextProcessor implements ITesseractImageTextProcessor {
    constructor(
        @inject(ILogger) private readonly _logger: ILogger,
        @inject(ITesseractConfiguration) private readonly _tesseractConfiguration: ITesseractConfiguration,
        @inject(ITesseractBlockMapper) private readonly _tessractBlockMapper: ITesseractBlockMapper,
        @inject(IImageFormatMapper) private readonly _imageFormatMapper: IImageFormatMapper,
    ) {}

    public async process(base64Image: string, languageCode = "eng"): Promise<ITextBlock[]> {
        const config = {
            workerPath: this._tesseractConfiguration.workerPath,
            langPath: this._tesseractConfiguration.langPath,
            corePath: this._tesseractConfiguration.corePath,
            gzip: this._tesseractConfiguration.isGzipped,
        };

        this._logger.log(config);

        const worker = await createWorker({
            ...config,
            errorHandler: (e) => this._logger.error(e),
        });

        await worker.loadLanguage(languageCode);
        await worker.initialize(languageCode, this._tesseractConfiguration.ocrEngineMode);

        const imageBytes = this._imageFormatMapper.map(base64Image);

        try {
            this._logger.log("Starting tesseract worker");
            const result = await worker.recognize(imageBytes);
            this._logger.log("Finished tesseract worker");
            return this._tessractBlockMapper.map(result, base64Image);
        } catch (e) {
            this._logger.log("Exception occurred in  tesseract worker");
            this._logger.error(e.code);
            return [];
        }
    }
}
