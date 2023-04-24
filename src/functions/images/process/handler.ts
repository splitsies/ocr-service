import type { ValidatedEventAPIGatewayProxyEvent } from "../../../libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "../../../libs/lambda";
import { container } from "../../../di/inversify.config";
import { IImageService } from "../../../services/image-service/image-service-interface";
import schema from "./schema";
import { ITextBlock, HttpStatusCode } from "@splitsies/shared-models";

const imageService = container.get<IImageService>(IImageService);

const process: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let result: ITextBlock[] = [];
    let statusCode = HttpStatusCode.OK;

    try {
        result = await imageService.processImage(event.body.image);
    } catch (ex) {
        statusCode = HttpStatusCode.BAD_REQUEST;
    }

    return formatJSONResponse(
        {
            message: result,
            event,
        },
        statusCode,
    );
};

export const main = middyfy(process);
