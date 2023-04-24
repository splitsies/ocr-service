import { OEM } from "tesseract.js";

export interface ITesseractConfiguration {
    readonly workerPath: string;
    readonly langPath: string;
    readonly corePath: string;
    readonly isGzipped: boolean;
    readonly ocrEngineMode: OEM;
}

export const ITesseractConfiguration: symbol = Symbol.for("ITesseractConfiguration");
