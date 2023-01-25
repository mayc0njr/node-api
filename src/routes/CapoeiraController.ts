import { CapoeiraRepository } from "@repositories/capoeira/CapoiraRepository";
import { PdfService } from "@services/PdfService";
import { CapoeiraUseCase } from "@useCases/CapoeiraUseCase";
import { Router } from "express";

const CapoeiraController = Router();
const businessUnitRepository = new CapoeiraRepository();
const pdfService = new PdfService();
const capoeiraUseCase = new CapoeiraUseCase(businessUnitRepository, pdfService);

CapoeiraController.get("/exame/:exameId", async (request, response) => {
  const pdf = await capoeiraUseCase.getCapoeiraPdf(request.params.exameId);
  response.setHeader("Content-Length", pdf.length);
  response.setHeader(
    "Content-Disposition",
    `attachment; filename=exame${request.params.exameId}.pdf`,
  );
  response.send(pdf);
});

export { CapoeiraController };
