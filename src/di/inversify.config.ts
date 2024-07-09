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
import { Initializer } from "@splitsies/algorithms";

const container = new Container({ defaultScope: "Singleton" });

container.bind<ILogger>(ILogger).to(Logger);
container.bind<IImageService>(IImageService).to(ImageService);
container.bind<IOcrManager>(IOcrManager).to(OcrManager);

container.bind<ITextractConfiguration>(ITextractConfiguration).to(TextractConfiguration);
container.bind<IOcrConfiguration>(IOcrConfiguration).to(OcrConfiguration);
container.bind<ITesseractConfiguration>(ITesseractConfiguration).to(TesseractConfiguration);
container.bind<ITesseractBlockMapper>(ITesseractBlockMapper).to(TesseractBlockMapper);
container.bind<ITextractBlockMapper>(ITextractBlockMapper).to(TextractBlockMapper);
container.bind<IImageFormatMapper>(IImageFormatMapper).to(ImageFormatMapper);

container.bind<IImageTextProcessorProvider>(IImageTextProcessorProvider).to(ImageTextProcessorProvider);
container.bind<ITesseractImageTextProcessor>(ITesseractImageTextProcessor).to(TesseractImageTextProcessor);
container.bind<ITextractImageTextProcessor>(ITextractImageTextProcessor).to(TextractImageTextProcessor);

container.bind<IApiConfiguration>(IApiConfiguration).to(ApiConfiguration);

Initializer.initialize(container);

export { container };
