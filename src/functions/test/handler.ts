import { container, ITester } from "@di/inversify.config";
import { middyfy } from "@libs/lambda";
import { DataResponse, HttpStatusCode } from "@splitsies/shared-models";
import { ILogger, SplitsiesFunctionHandlerFactory } from "@splitsies/utils";


const logger = container.get<ILogger>(ILogger);
const tester = container.get<ITester>(ITester);

export const main = middyfy(
    SplitsiesFunctionHandlerFactory.create<never, null | number>(
        logger,
        async (event) => {
            return new DataResponse(HttpStatusCode.OK, tester.timeSinceStart).toJson();
        })
);
