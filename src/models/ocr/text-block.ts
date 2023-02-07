import { BoundingBox } from "./bounding-box";

export interface TextBlock {
    readonly text: string;
    readonly boundingBox: BoundingBox;
    readonly confidence: number;
}