export interface ITextractConfiguration {
    readonly accessId: string;
    readonly secretAccessKey: string;
    readonly region: string;
}

export const ITextractConfiguration = Symbol.for("ITextractConfiguration");
