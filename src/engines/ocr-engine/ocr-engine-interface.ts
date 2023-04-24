import { ITextBlock } from "@splitsies/shared-models";

export interface IOcrEngine {
    recognize(base64Image: string, languageCode?: string): Promise<ITextBlock[]>;
}

export const IOcrEngine: symbol = Symbol.for("IOcrEngine");
