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
    private readonly _workerPath: string;
    private readonly _langPath: string;
    private readonly _corePath: string;
    private readonly _isGzipped: boolean;
    private readonly _ocrEngineMode: OEM;

    constructor() {
        assert(!!process.env.TESSERACT_WORKER_PATH, "TESSERACT_WORKER_PATH was undefined");
        assert(!!process.env.TESSERACT_LANG_PATH, "TESSERACT_LANG_PATH was undefined");
        assert(!!process.env.TESSERACT_CORE_PATH, "TESSERACT_CORE_PATH was undefined");
        assert(!!process.env.TESSERACT_IS_GZIPPED, "TESSERACT_IS_GZIPPED was undefined");
        assert(!!process.env.TESSERACT_OCR_ENGINE_MODE, "TESSERACT_OCR_ENGINE_MODE was undefined");

        this._workerPath = path.join(__dirname, process.env.TESSERACT_WORKER_PATH);
        this._langPath = path.join(__dirname, process.env.TESSERACT_LANG_PATH);
        this._corePath = path.join(__dirname, process.env.TESSERACT_CORE_PATH);
        this._isGzipped = process.env.TESSERACT_IS_GZIPPED.toLowerCase() === "true";
        this._ocrEngineMode = OEM[process.env.TESSERACT_OCR_ENGINE_MODE];
    }

    get workerPath(): string {
        return this._workerPath;
    }

    get langPath(): string {
        return this._langPath;
    }

    get corePath(): string {
        return this._corePath;
    }

    get isGzipped(): boolean {
        return this._isGzipped;
    }

    get ocrEngineMode(): OEM {
        return this._ocrEngineMode;
    }
}
