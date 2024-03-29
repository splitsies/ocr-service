export interface IApiConfiguration {
    uri: {
        algorithms: string;
    };
    apiKey: string;
}

export const IApiConfiguration = Symbol.for("IApiConfiguration");
