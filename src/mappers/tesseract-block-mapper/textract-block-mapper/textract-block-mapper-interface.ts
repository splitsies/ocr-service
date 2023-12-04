import { Block } from "@aws-sdk/client-textract";
import { ITextBlock } from "@splitsies/shared-models";

export interface ITextractBlockMapper {
    map(result: Block[]): ITextBlock[];
}

export const ITextractBlockMapper: symbol = Symbol.for("ITextractBlockMapper");
