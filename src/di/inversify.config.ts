import { Container } from "inversify";
import "reflect-metadata";
import { IImageProcessor } from "src/processors/image-processor/image-processor-interface";
import { ImageProcessor } from "src/processors/image-processor/image-processor";
import { IImageService } from "src/services/image-service/image-service-interface";
import { ImageService } from "src/services/image-service/image-service";
import { IOcrEngine } from "src/engines/ocr-engine/ocr-engine-interface";
import { TesseractOcrEngine } from "@engines/ocr-engine/tesseract-ocr-engine";
import { ITesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration-interface";
import { TesseractConfiguration } from "../models/configuration/tesseract-configuration/tesseract-configuration";
import { ITesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper-interace";
import { TesseractBlockMapper } from "src/mappers/tesseract-block-mapper/tesseract-block-mapper";

const container = new Container();

container.bind<IImageProcessor>(IImageProcessor).to(ImageProcessor).inSingletonScope();
container.bind<IImageService>(IImageService).to(ImageService).inSingletonScope();
container.bind<IOcrEngine>(IOcrEngine).to(TesseractOcrEngine).inSingletonScope();

container.bind<ITesseractConfiguration>(ITesseractConfiguration).to(TesseractConfiguration).inSingletonScope();
container.bind<ITesseractBlockMapper>(ITesseractBlockMapper).to(TesseractBlockMapper).inSingletonScope();

export { container };