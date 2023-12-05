import { injectable } from "inversify";
import { ITextractConfiguration } from "./textract-configuration-interface";
import { assert } from "console";

@injectable()
export class TextractConfiguration implements ITextractConfiguration {
    readonly accessId: string;
    readonly secretAccessKey: string;
    readonly region: string;

    constructor() {
        assert(!!process.env.TEXTRACT_ACCESS_KEY, "TEXTRACT_ACCESS_KEY was undefined");
        assert(!!process.env.TEXTRACT_SECRET_ACCESS_KEY, "TEXTRACT_SECRET_ACCESS_KEY was undefined");
        assert(!!process.env.TEXTRACT_REGION, "TEXTRACT_REGION was undefined");

        this.accessId = process.env.TEXTRACT_ACCESS_KEY;
        this.secretAccessKey = process.env.TEXTRACT_SECRET_ACCESS_KEY;
        this.region = process.env.TEXTRACT_REGION;
    }
}
