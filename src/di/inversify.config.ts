import { Container } from "inversify";
import "reflect-metadata";
import { TesseractImageTextProcessor } from "@processors/tesseract-image-text-processor/tesseract-image-text-processor";
import { IImageService } from "src/services/image-service/image-service-interface";
import { ImageService } from "src/services/image-service/image-service";
import { ITesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration-interface";
import { TesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration";
import { ITesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { TesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper";
import { ImageFormatMapper } from "src/mappers/image/image-format-mapper";
import { IImageFormatMapper } from "src/mappers/image/image-format-mapper-interface";
import { ILogger, Logger } from "@splitsies/utils";
import { IOcrManager } from "src/managers/ocr-manager/ocr-manager-interface";
import { OcrManager } from "src/managers/ocr-manager/ocr-manager";
import { IOcrConfiguration } from "@models/configuration/ocr-configuration/ocr-configuration-interface";
import { OcrConfiguration } from "@models/configuration/ocr-configuration/ocr-configuration";
import { ITextractConfiguration } from "@models/configuration/textract-configuration/textract-configuration-interface";
import { TextractConfiguration } from "@models/configuration/textract-configuration/textract-configuration";
import { IImageTextProcessorProvider } from "src/providers/image-text-processor-provider/image-text-processor-provider-interface";
import { ImageTextProcessorProvider } from "src/providers/image-text-processor-provider/image-text-processor-provider";
import { ITextractBlockMapper } from "src/mappers/tesseract-block-mapper/textract-block-mapper/textract-block-mapper-interface";
import { TextractBlockMapper } from "src/mappers/tesseract-block-mapper/textract-block-mapper/textract-block-mapper";
import { ITextractImageTextProcessor } from "@processors/textract-image-text-processor/textract-image-text-processor-interface";
import { TextractImageTextProcessor } from "@processors/textract-image-text-processor/textract-image-text-processor";
import { ITesseractImageTextProcessor } from "@processors/tesseract-image-text-processor/tesseract-image-text-processor-interface";
import { IApiConfiguration } from "@models/configuration/api/api-configuration-interface";
import { ApiConfiguration } from "@models/configuration/api/api-configuration";
import { IAlgorithmsApiClient } from "src/api/algorithms-api-client/algorithms-api-client-interface";
import { AlgorithmsApiClient } from "src/api/algorithms-api-client/algorithms-api-client";
import { FirebaseConfiguration } from "@models/configuration/firebase/firebase-configuration";
import { IFirebaseConfiguration } from "@models/configuration/firebase/firebase-configuration-interface";
import { AdminAuthProvider } from "src/providers/admin-auth-provider/admin-auth-provider";
import { IAdminAuthProvider } from "src/providers/admin-auth-provider/admin-auth-provider-interface";
import { JwtStrategyProvider } from "src/providers/jwt-strategy-provider/jwt-strategy-provider";
import { IJwtStrategyProvider } from "src/providers/jwt-strategy-provider/jwt-strategy-provider-interface";
import { EmulatedJwtAuthStrategy } from "src/strategies/jwt-auth-strategy/emulated-jwt-auth-strategy/emulated-jwt-auth-strategy";
import { IEmulatedJwtAuthStrategy } from "src/strategies/jwt-auth-strategy/emulated-jwt-auth-strategy/emulated-jwt-auth-strategy-interface";
import { FirebaseJwtAuthStrategy } from "src/strategies/jwt-auth-strategy/firebase-jwt-auth-strategy/firebase-jwt-auth-strategy";
import { IFirebaseJwtAuthStrategy } from "src/strategies/jwt-auth-strategy/firebase-jwt-auth-strategy/firebase-jwt-auth-strategy-interface";

const container = new Container();

container.bind<ILogger>(ILogger).to(Logger).inSingletonScope();

container.bind<IImageService>(IImageService).to(ImageService).inSingletonScope();
container.bind<IOcrManager>(IOcrManager).to(OcrManager).inSingletonScope();

container.bind<ITextractConfiguration>(ITextractConfiguration).to(TextractConfiguration).inSingletonScope();
container.bind<IOcrConfiguration>(IOcrConfiguration).to(OcrConfiguration).inSingletonScope();
container.bind<ITesseractConfiguration>(ITesseractConfiguration).to(TesseractConfiguration).inSingletonScope();
container.bind<ITesseractBlockMapper>(ITesseractBlockMapper).to(TesseractBlockMapper).inSingletonScope();
container.bind<ITextractBlockMapper>(ITextractBlockMapper).to(TextractBlockMapper).inSingletonScope();
container.bind<IImageFormatMapper>(IImageFormatMapper).to(ImageFormatMapper).inSingletonScope();

container
    .bind<IImageTextProcessorProvider>(IImageTextProcessorProvider)
    .to(ImageTextProcessorProvider)
    .inSingletonScope();
container
    .bind<ITesseractImageTextProcessor>(ITesseractImageTextProcessor)
    .to(TesseractImageTextProcessor)
    .inSingletonScope();
container
    .bind<ITextractImageTextProcessor>(ITextractImageTextProcessor)
    .to(TextractImageTextProcessor)
    .inSingletonScope();

container.bind<IApiConfiguration>(IApiConfiguration).to(ApiConfiguration).inSingletonScope();
container.bind<IAlgorithmsApiClient>(IAlgorithmsApiClient).to(AlgorithmsApiClient).inSingletonScope();

container.bind<IFirebaseConfiguration>(IFirebaseConfiguration).to(FirebaseConfiguration).inSingletonScope();
container.bind<IAdminAuthProvider>(IAdminAuthProvider).to(AdminAuthProvider).inSingletonScope();
container.bind<IJwtStrategyProvider>(IJwtStrategyProvider).to(JwtStrategyProvider).inSingletonScope();
container.bind<IEmulatedJwtAuthStrategy>(IEmulatedJwtAuthStrategy).to(EmulatedJwtAuthStrategy).inSingletonScope();
container.bind<IFirebaseJwtAuthStrategy>(IFirebaseJwtAuthStrategy).to(FirebaseJwtAuthStrategy).inSingletonScope();

export { container };
