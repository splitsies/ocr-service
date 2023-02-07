import { TextBlock } from "@models/ocr/text-block";
import { inject, injectable } from "inversify";
import { IImageProcessor } from "src/processors/image-processor/image-processor-interface";
import { IImageService } from "./image-service-interface";

@injectable()
export class ImageService implements IImageService {

    constructor(@inject(IImageProcessor) private readonly _imageProcessor: IImageProcessor) { }


    public async processImage(base64EncodedImg: string): Promise<TextBlock[]> {
        const imageBytes = this.toBytes(base64EncodedImg);
        const result = this._imageProcessor.process(imageBytes);
        return result;
    }

    private toBytes(base64EncodedImg: string): ArrayBuffer {
        try {
            return Buffer.from(base64EncodedImg, "base64")
        } catch (ex) {
            console.log("Error in decoding base64 string", ex)
        }
    }
}