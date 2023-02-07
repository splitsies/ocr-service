import { injectable } from "inversify";
import sizeOf from "image-size";
import { TextBlock } from "@models/ocr/text-block";
import { ITesseractBlockMapper } from "./tesseract-block-mapper-interace";
import { BoundingBox } from "@models/ocr/bounding-box";
import type { RecognizeResult } from "tesseract.js";

@injectable()
export class TesseractBlockMapper implements ITesseractBlockMapper {
    public map(tesseractResult: RecognizeResult, base64Image: string): TextBlock[] {

        // Tesseract Bbox has coordinates defined in pixels
        // need the image dimensions to calculate the ratio
        const size = sizeOf(Buffer.from(base64Image, "base64"));

        return tesseractResult.data.words.map(word => {
            return {
                boundingBox: {
                    top: (word.bbox.y0 / size.height),
                    left: (word.bbox.x0 / size.width),
                    width: word.bbox.x1 - word.bbox.x0,
                    height: word.bbox.y1 - word.bbox.y0,
                } as BoundingBox,
                text: word.text,
                confidence: word.confidence,
            } as TextBlock;
        });
    }
}