
import { ITextBlock } from "@splitsies/shared-models";
import type { RecognizeResult } from "tesseract.js";

export interface ITesseractBlockMapper {
    map(tesseractResult: RecognizeResult, base64Image: string): ITextBlock[];
}

export const ITesseractBlockMapper: symbol = Symbol.for("ITesseractBlockMapper");