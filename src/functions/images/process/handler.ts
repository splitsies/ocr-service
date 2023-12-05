import schema from "./schema";
import { container } from "../../../di/inversify.config";
import { IImageService } from "../../../services/image-service/image-service-interface";
import { DataResponse, HttpStatusCode, IOcrResult } from "@splitsies/shared-models";
import { ILogger, SplitsiesFunctionHandlerFactory, ExpectedError } from "@splitsies/utils";
import { middyfy } from "@libs/lambda";
import { ImageProcessingError } from "@models/errors/image-processing-error";

const logger = container.get<ILogger>(ILogger);
const imageService = container.get<IImageService>(IImageService);

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<typeof schema, IOcrResult>(
        logger,
        async (event) => {
            const result = await imageService.processImage(event.body.image);
            return new DataResponse(HttpStatusCode.OK, result).toJson();
        },
        [new ExpectedError(ImageProcessingError, HttpStatusCode.BAD_REQUEST, "Unable to process text from image")],
    ),
);
