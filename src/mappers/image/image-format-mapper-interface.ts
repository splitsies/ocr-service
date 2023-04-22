import { IMapper } from "../mapper-interface";

export interface IImageFormatMapper extends IMapper<string, ArrayBuffer> { }

export const IImageFormatMapper: symbol = Symbol.for("IImageFormatMapper");