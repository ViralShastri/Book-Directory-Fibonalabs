const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API for Book Directory",
        version: "1.0.0",
        description:
            "This is a REST API application made with Express for a Book Directory.",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
