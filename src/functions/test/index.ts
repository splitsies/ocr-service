
import { handlerPath } from "../../libs/handler-path";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    timeout: 60,
    events: [
        {
            http: {
                method: "get",
                path: "test",
            },
        },
    ],
};
