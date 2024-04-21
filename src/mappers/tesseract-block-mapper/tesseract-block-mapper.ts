import { injectable } from "inversify";
import sizeOf from "image-size";
import { BoundingBox, ITextBlock, TextBlock } from "@splitsies/shared-models";
import { ITesseractBlockMapper } from "./tesseract-block-mapper-interace";
import type { RecognizeResult } from "tesseract.js";

@injectable()
export class TesseractBlockMapper implements ITesseractBlockMapper {
    public map(tesseractResult: RecognizeResult, base64Image: string): ITextBlock[] {
        // Tesseract Bbox has coordinates defined in pixels
        // need the image dimensions to calculate the ratio
        const size = sizeOf(Buffer.from(base64Image, "base64"));

        return tesseractResult.data.words.map((word) => {
            const boundingBox = new BoundingBox(
                word.bbox.y0 / size.height,
                word.bbox.x0 / size.width,
                (word.bbox.x1 - word.bbox.x0) / size.width,
                (word.bbox.y1 - word.bbox.y0) / size.height,
            );

            return new TextBlock(word.text, boundingBox, word.confidence);
        });
    }
}
