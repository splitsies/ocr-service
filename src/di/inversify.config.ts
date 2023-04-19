import { Container } from "inversify";
import "reflect-metadata";
import { IImageTextProcessor } from "@processors/image-text-processor/image-text-processor-interface";
import { TesseractImageTextProcessor } from "@processors/image-text-processor/tesseract-image-text-processor";
import { IImageService } from "src/services/image-service/image-service-interface";
import { ImageService } from "src/services/image-service/image-service";
import { IOcrEngine } from "src/engines/ocr-engine/ocr-engine-interface";
import { OcrEngine } from "@engines/ocr-engine/ocr-engine";
import { ITesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration-interface";
import { TesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration";
import { ITesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { TesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper";

const container = new Container();

container.bind<IImageTextProcessor>(IImageTextProcessor).to(TesseractImageTextProcessor).inSingletonScope();
container.bind<IImageService>(IImageService).to(ImageService).inSingletonScope();
container.bind<IOcrEngine>(IOcrEngine).to(OcrEngine).inSingletonScope();

container.bind<ITesseractConfiguration>(ITesseractConfiguration).to(TesseractConfiguration).inSingletonScope();
container.bind<ITesseractBlockMapper>(ITesseractBlockMapper).to(TesseractBlockMapper).inSingletonScope();

export { container };