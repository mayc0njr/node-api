import "dotenv/config";
import cors from "cors";
import express, { NextFunction } from "express";
import "express-async-errors";
import { CapoeiraController } from "@routes/CapoeiraController";
import { AppError } from "@shared/errors/AppError";
import { ErrorCodes } from "@shared/errors/ErrorCodes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "@src/swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/capoeira", CapoeiraController);

app.use((error, request, response, next: NextFunction): any => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return response.status(ErrorCodes.SERVER_INTERNAL_ERROR).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`);
});
