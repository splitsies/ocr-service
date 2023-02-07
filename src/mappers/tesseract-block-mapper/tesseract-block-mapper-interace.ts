import { TextBlock } from "@models/ocr/text-block";
import type { RecognizeResult } from "tesseract.js";

export interface ITesseractBlockMapper {
    map(tesseractResult: RecognizeResult, base64Image: string): TextBlock[];
}

export const ITesseractBlockMapper: symbol = Symbol.for("ITesseractBlockMapper");