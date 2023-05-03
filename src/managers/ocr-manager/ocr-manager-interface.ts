import { ITextBlock } from "@splitsies/shared-models";

export interface IOcrManager {
    recognize(base64Image: string, languageCode?: string): Promise<ITextBlock[]>;
}

export const IOcrManager: symbol = Symbol.for("IOcrEngine");
