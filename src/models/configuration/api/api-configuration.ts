import assert from "assert";
import { injectable } from "inversify";
import { IApiConfiguration } from "./api-configuration-interface";

@injectable()
export class ApiConfiguration implements IApiConfiguration {
    readonly uri: { algorithms: string };
    readonly apiKey: string;

    constructor() {
        assert(!!process.env.ALGORITHMS_API_URI, "ALGORITHMS_API_URI was undefined");
        assert(!!process.env.INTERNAL_API_KEY, "INTERNAL_API_KEY was undefined");

        this.uri = {
            algorithms: process.env.ALGORITHMS_API_URI,
        };
        this.apiKey = process.env.INTERNAL_API_KEY;
    }
}
