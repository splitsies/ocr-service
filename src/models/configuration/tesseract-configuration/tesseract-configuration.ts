import assert from "assert";
import path from "path";
import { injectable } from "inversify";
import { OEM } from "tesseract.js";
import { ITesseractConfiguration } from "./tesseract-configuration-interface";

/**
 * Type safe configuration model for Tesseract. Values are defined in tesseract.config.json and inserted as
 * environment variables in serverless.ts
 */
@injectable()
export class TesseractConfiguration implements ITesseractConfiguration {
    readonly workerPath: string;
    readonly langPath: string;
    readonly corePath: string;
    readonly isGzipped: boolean;
    readonly ocrEngineMode: OEM;

    constructor() {
        assert(!!(process.env.TESSERACT_WORKER_PATH || process.env.TesseractWorkerPath), "TESSERACT_WORKER_PATH was undefined");
        assert(!!(process.env.TESSERACT_LANG_PATH || process.env.TesseractLangPath), "TESSERACT_LANG_PATH was undefined");
        assert(!!(process.env.TESSERACT_CORE_PATH || process.env.TesseractCorePath), "TESSERACT_CORE_PATH was undefined");
        assert(!!(process.env.TESSERACT_IS_GZIPPED || process.env.TesseractIsGzipped), "TESSERACT_IS_GZIPPED was undefined");
        assert(!!(process.env.TESSERACT_OCR_ENGINE_MODE || process.env.TesseractOcrEngineMode), "TESSERACT_OCR_ENGINE_MODE was undefined");

        this.isGzipped = (process.env.TESSERACT_IS_GZIPPED || process.env.TesseractIsGzipped).toLowerCase() === "true";
        this.ocrEngineMode = OEM[(process.env.TESSERACT_OCR_ENGINE_MODE || process.env.TESSERACT_OCR_ENGINE_MODE)];

        this.workerPath = path.isAbsolute((process.env.TESSERACT_WORKER_PATH || process.env.TesseractWorkerPath))
            ? (process.env.TESSERACT_WORKER_PATH || process.env.TesseractWorkerPath)
            : path.join(__dirname, (process.env.TESSERACT_WORKER_PATH || process.env.TesseractWorkerPath));

        this.langPath = path.isAbsolute((process.env.TESSERACT_LANG_PATH || process.env.TesseractLangPath))
            ? (process.env.TESSERACT_LANG_PATH || process.env.TesseractLangPath)
            : path.join(__dirname, (process.env.TESSERACT_LANG_PATH || process.env.TesseractLangPath));

        this.corePath = path.isAbsolute((process.env.TESSERACT_CORE_PATH || process.env.TesseractCorePath))
            ? (process.env.TESSERACT_CORE_PATH || process.env.TesseractCorePath)
            : path.join(__dirname, (process.env.TESSERACT_CORE_PATH || process.env.TesseractCorePath));
    }
}
