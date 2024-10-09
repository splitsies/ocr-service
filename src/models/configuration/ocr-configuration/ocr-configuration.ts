import assert from "assert";
import { IOcrConfiguration } from "./ocr-configuration-interface";
import { injectable } from "inversify";

@injectable()
export class OcrConfiguration implements IOcrConfiguration {
    readonly ocrEngine: string;

    constructor() {
        assert(!!(process.env.OCR_ENGINE || process.env.OcrEngine), "OCR_ENGINE was undefined");
        this.ocrEngine = process.env.OCR_ENGINE || process.env.OcrEngine;
    }
}
