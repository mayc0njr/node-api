import swaggerAutogen from "swagger-autogen";

const outputFile = "src/swagger.json";
const endpointsFiles = ["src/routes/Rac7Controller.ts", "src/server.ts"];

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Vale-Pdf - Rac7",
    description: "API Rest to generate PDF Files for Proteger System.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require("./src/server.ts"); // Your project's root file
});
