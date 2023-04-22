import { injectable } from "inversify";
import { IImageFormatMapper } from "./image-format-mapper-interface";

@injectable()
export class ImageFormatMapper implements IImageFormatMapper {

    map(base64: string): ArrayBuffer {
        try {
            return Buffer.from(base64, "base64")
        } catch (ex) {
            console.error("Error in decoding base64 string", ex)
        }
    }

}