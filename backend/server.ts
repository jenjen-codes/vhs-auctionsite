import express from "express";
import http from "http";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as data from "./data/mockDatabase";
/* import cors from 'cors'; */

const app = express();
const server = http.createServer(app);

// --------------------------------------------------------------------------
// SWAGGER:
// --------------------------------------------------------------------------

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My auction API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --------------------------------------------------------------------------
// START THE SERVER:
// --------------------------------------------------------------------------
data.Init();
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
