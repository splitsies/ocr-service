
/**
 * Defines the box bounding recognized text
 */
export interface BoundingBox {
    /**
     * The top of the box based on the offset from the top edge of the image, 
     * represented as a float relative to the image height, e.g. 200px / 500px = 0.4
     */
    readonly top: number;

    /**
     * The top of the box based on the offset from the left edge of the image, 
     * represented as a float relative to the image width, e.g. 200px / 500px = 0.4
     */
    readonly left: number;

    /**
     * The width of the box in pixels
     */
    readonly width: number;

    /**
     * The height of the box in pixels
     */
    readonly height: number;
}