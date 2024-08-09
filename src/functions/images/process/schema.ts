export default {
    type: "object",
    properties: {
        pingEvent: { type: "boolean" },
        image: { type: "string" }, // base64 encoded image
    },
    required: ["image"],
} as const;
