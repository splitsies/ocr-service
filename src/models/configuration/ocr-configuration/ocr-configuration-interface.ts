export interface IOcrConfiguration {
    readonly ocrEngine: string;
}

export const IOcrConfiguration = Symbol.for("IOcrConfiguration");
