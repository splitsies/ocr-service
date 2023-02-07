import { TextBlock } from "@models/ocr/text-block";

export interface IOcrEngine {
    recognize(base64Image: string, languageCode?: string): Promise<TextBlock[]>;
}

export const IOcrEngine: symbol = Symbol.for("IOcrEngine");