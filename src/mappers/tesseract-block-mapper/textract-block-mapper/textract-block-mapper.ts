import { Block, DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";
import { BoundingBox, ITextBlock } from "@splitsies/shared-models";
import { ITextractBlockMapper } from "./textract-block-mapper-interface";
import { injectable } from "inversify";

@injectable()
export class TextractBlockMapper implements ITextractBlockMapper {
    map(result: Block[]): ITextBlock[] {
        return result.map((b) => {
            return {
                text: b.Text,
                boundingBox: new BoundingBox(
                    b.Geometry.BoundingBox.Top,
                    b.Geometry.BoundingBox.Left,
                    b.Geometry.BoundingBox.Width,
                    b.Geometry.BoundingBox.Height,
                ),
                confidence: b.Confidence,
            } as ITextBlock;
        });
    }
}
