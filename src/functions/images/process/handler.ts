import type { ValidatedEventAPIGatewayProxyEvent } from '../../../libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from "../../../libs/lambda";
import { container } from '../../../di/inversify.config';
import { IImageService } from '../../../services/image-service/image-service-interface';
import schema from './schema';
import { TextBlock } from '@models/ocr/text-block';
import { HttpStatusCode } from '@models/enums/http-status-code';

const imageService = container.get<IImageService>(IImageService);

const process: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    let result: TextBlock[] = [];
    let statusCode = HttpStatusCode.OK;

    try {
        result = await imageService.processImage(event.body.image);
    }  catch (ex) {
        statusCode = HttpStatusCode.BAD_REQUEST;
    }

    return formatJSONResponse({
        message: result,
        event,
    }, statusCode);
};

export const main = middyfy(process);
