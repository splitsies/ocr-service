const path = require("node:path");
const fs = require("node:fs");

const map = (result) => result.map((b) => {
    return {
        text: b.Text,
        boundingBox: {
            top: b.Geometry.BoundingBox.Top,
            left: b.Geometry.BoundingBox.Left,
            width: b.Geometry.BoundingBox.Width,
            height: b.Geometry.BoundingBox.Height,
        },
        confidence: b.Confidence,
    };
});

const filePath = process.argv[2];
const textractResult = require(filePath);
const dirname = path.dirname(filePath);
const ocrResult = JSON.stringify({ textBlocks: map(textractResult.Blocks) }, null, 2);
fs.writeFileSync(`${dirname}/ocrResult.json`, ocrResult);
