import { injectable } from "inversify";
import { ITextractConfiguration } from "./textract-configuration-interface";
import { assert } from "console";

@injectable()
export class TextractConfiguration implements ITextractConfiguration {
    readonly accessId: string;
    readonly secretAccessKey: string;
    readonly region: string;

    constructor() {
        assert(
            !!(process.env.TEXTRACT_ACCESS_KEY || process.env.TextractAccessKey),
            "TEXTRACT_ACCESS_KEY was undefined",
        );
        assert(
            !!(process.env.TEXTRACT_SECRET_ACCESS_KEY || process.env.TextractSecretAccessKey),
            "TEXTRACT_SECRET_ACCESS_KEY was undefined",
        );
        assert(!!(process.env.TEXTRACT_REGION || process.env.TextractRegion), "TEXTRACT_REGION was undefined");

        this.accessId = process.env.TEXTRACT_ACCESS_KEY || process.env.TextractAccessKey;
        this.secretAccessKey = process.env.TEXTRACT_SECRET_ACCESS_KEY || process.env.TextractSecretAccessKey;
        this.region = process.env.TEXTRACT_REGION || process.env.TextractRegion;
    }
}
