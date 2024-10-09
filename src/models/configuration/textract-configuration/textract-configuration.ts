import { injectable } from "inversify";
import { ITextractConfiguration } from "./textract-configuration-interface";
import { assert } from "console";

@injectable()
export class TextractConfiguration implements ITextractConfiguration {
    readonly region: string;

    constructor() {
        assert(!!(process.env.TEXTRACT_REGION || process.env.TextractRegion), "TEXTRACT_REGION was undefined");
        this.region = process.env.TEXTRACT_REGION || process.env.TextractRegion;
    }
}
