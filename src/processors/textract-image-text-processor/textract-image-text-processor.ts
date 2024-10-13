import { inject, injectable } from "inversify";
import { ITextractImageTextProcessor } from "./textract-image-text-processor-interface";
import { ITextBlock } from "@splitsies/shared-models";
import { DetectDocumentTextCommand, TextractClient } from "@aws-sdk/client-textract";
import { ILogger } from "@splitsies/utils";
import { ITextractConfiguration } from "../../models/configuration/textract-configuration/textract-configuration-interface";
import { IImageFormatMapper } from "../../mappers/image/image-format-mapper-interface";
import { ITextractBlockMapper } from "../../mappers/tesseract-block-mapper/textract-block-mapper/textract-block-mapper-interface";
import { ImageProcessingError } from "../../models/errors/image-processing-error";

@injectable()
export class TextractImageTextProcessor implements ITextractImageTextProcessor {
    private readonly _client: TextractClient;

    constructor(
        @inject(ITextractConfiguration) textractConfiguration: ITextractConfiguration,
        @inject(ILogger) private readonly _logger: ILogger,
        @inject(IImageFormatMapper) private readonly _imageFormatMapper: IImageFormatMapper,
        @inject(ITextractBlockMapper) private readonly _textractBlockMapper: ITextractBlockMapper,
    ) {
        this._client = new TextractClient({
            region: textractConfiguration.region,
        });
    }

    async process(base64Image: string, languageCode?: string): Promise<ITextBlock[]> {
        const request = new DetectDocumentTextCommand({
            Document: {
                Bytes: this._imageFormatMapper.map(base64Image) as Uint8Array,
            },
        });

        try {
            const response = await this._client.send(request);
            return this._textractBlockMapper.map(response.Blocks.filter((b) => b.BlockType === "LINE"));
        } catch (e) {
            this._logger.log(e);
            throw new ImageProcessingError(e.message);
        }
    }
}
