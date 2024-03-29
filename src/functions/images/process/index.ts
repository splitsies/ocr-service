import schema from "./schema";
import { handlerPath } from "../../../libs/handler-path";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    timeout: 60,
    events: [
        {
            http: {
                method: "post",
                path: "process",
                authorizer: { name: "verifyToken" },
                request: {
                    schemas: {
                        "application/json": schema,
                    },
                },
            },
        },
    ],
};
