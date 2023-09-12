const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const { logger } = require("./logger");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Swagger Product api documentation"
        },
    },
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.start(`🚀 Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs
