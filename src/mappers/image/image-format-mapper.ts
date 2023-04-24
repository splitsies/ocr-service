import { inject, injectable } from "inversify";
import { IImageFormatMapper } from "./image-format-mapper-interface";
import { ILogger } from "@splitsies/utils";

@injectable()
export class ImageFormatMapper implements IImageFormatMapper {
    constructor(@inject(ILogger) private readonly _logger: ILogger) {}

    map(base64: string): ArrayBuffer {
        try {
            return Buffer.from(base64, "base64");
        } catch (ex) {
            this._logger.error(`Error in decoding base64 string ${ex}`);
        }
    }
}
