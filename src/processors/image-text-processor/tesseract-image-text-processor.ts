import { inject, injectable } from "inversify";
import { createWorker } from "tesseract.js";
import { ITesseractConfiguration } from "@models/configuration/tesseract-configuration/tesseract-configuration-interface";
import { ITesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { IImageTextProcessor } from "./image-text-processor-interface";
import { ITextBlock } from "@splitsies/shared-models";

@injectable()
export class TesseractImageTextProcessor implements IImageTextProcessor {
    
    constructor (
        @inject(ITesseractConfiguration) private readonly _tesseractConfiguration: ITesseractConfiguration,
        @inject(ITesseractBlockMapper) private readonly _tessractBlockMapper: ITesseractBlockMapper,
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
            errorHandler: e => console.log(e)
        });

        await worker.loadLanguage(languageCode);
        await worker.initialize(languageCode, this._tesseractConfiguration.ocrEngineMode);

        const result = await worker.recognize(base64Image);
        return this._tessractBlockMapper.map(result, base64Image);
    }
}