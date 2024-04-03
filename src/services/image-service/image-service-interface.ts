import { IExpenseDto } from "@splitsies/shared-models";

export interface IImageService {
    processImage(base64EncodedImg: string): Promise<IExpenseDto>;
}

export const IImageService: symbol = Symbol.for("IImageService");
