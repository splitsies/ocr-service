import { inject, injectable } from "inversify";
import { createWorker } from "tesseract.js";
import { ITesseractConfiguration } from "@models/configuration/tesseract-configuration/tesseract-configuration-interface";
import { ITesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { IImageTextProcessor } from "./image-text-processor-interface";
import { ITextBlock } from "@splitsies/shared-models";
import { IImageFormatMapper } from "src/mappers/image/image-format-mapper-interface";

@injectable()
export class TesseractImageTextProcessor implements IImageTextProcessor {
    
    constructor (
        @inject(ITesseractConfiguration) private readonly _tesseractConfiguration: ITesseractConfiguration,
        @inject(ITesseractBlockMapper) private readonly _tessractBlockMapper: ITesseractBlockMapper,
        @inject(IImageFormatMapper) private readonly _imageFormatMapper: IImageFormatMapper
    ) { }

    public async process(base64Image: string, languageCode = "eng"): Promise<ITextBlock[]> {
        const config = {
            workerPath: this._tesseractConfiguration.workerPath,
            langPath: this._tesseractConfiguration.langPath,
            corePath: this._tesseractConfiguration.corePath,
            gzip: this._tesseractConfiguration.isGzipped,
        };

        const worker = await createWorker({
            ...config,
            errorHandler: e => console.error(e)
        });

        await worker.loadLanguage(languageCode);
        await worker.initialize(languageCode, this._tesseractConfiguration.ocrEngineMode);

        const imageBytes = this._imageFormatMapper.map(base64Image);

        try {
            const result = await worker.recognize(imageBytes);
            return this._tessractBlockMapper.map(result, base64Image);
        } catch (e) { 
            console.error(Object.keys(e));
            console.error(e.code);
            return [];
        }

    }
}