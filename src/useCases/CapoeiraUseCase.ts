import { AppError } from "@shared/errors/AppError";
import { Exame } from "@models/Exame";
import { PdfOptions } from "@models/PdfOptions";
import { CapoeiraRepository } from "@repositories/capoeira/CapoiraRepository";
import { PdfService } from "@services/PdfService";
import path from "path";

export class CapoeiraUseCase {
  private pdfOptions: PdfOptions = {
    displayHeaderFooter: true,
    printBackground: true,
  };
  private coverOptions: PdfOptions = {
    displayHeaderFooter: false,
    printBackground: true,
  };

  constructor(
    private capoeiraRepository: CapoeiraRepository,
    private pdfService: PdfService,
  ) {}

  private async renderCapoeiraEjs(exame: Exame): Promise<string> {
    return await this.pdfService.renderEjs(
      path.join("./src", "templates", "capoeira", "document.ejs"),
      { exame },
    );
  }
  private async renderCapoeiraEjsCover(exame: Exame): Promise<string> {
    return await this.pdfService.renderEjs(
      path.join("./src", "templates", "capoeira", "cover.ejs"),
      { exame },
    );
  }
  private async renderCapoeiraEjsHeader(exame: Exame): Promise<string> {
    return await this.pdfService.renderEjs(
      path.join("./src", "templates", "capoeira", "header.ejs"),
      { exame },
    );
  }
  private async renderCapoeiraEjsFooter(exame: Exame): Promise<string> {
    return await this.pdfService.renderEjs(
      path.join("./src", "templates", "capoeira", "footer.ejs"),
      { exame },
    );
  }
  private async renderCapoeiraPdfContent(
    data: string,
    header: string,
    footer: string,
  ): Promise<Buffer> {
    return await this.pdfService.renderPdfContent(
      data,
      this.pdfOptions,
      header,
      footer,
    );
  }

  private async renderCapoeiraPdfCover(data: string): Promise<Buffer> {
    return await this.pdfService.renderPdfContent(data, this.coverOptions);
  }
  public async mergePdf(cover: Buffer, content: Buffer) {
    return await this.pdfService.mergePdf(cover, content);
  }

  public async printCapoeiraPdf(exame: Exame) {
    const document = this.renderCapoeiraEjs(exame);
    const header = this.renderCapoeiraEjsHeader(exame);
    const footer = this.renderCapoeiraEjsFooter(exame);
    const cover = this.renderCapoeiraEjsCover(exame);
    try {
      const [documentHtml, headerHtml, footerHtml, coverHtml] =
        await Promise.all([document, header, footer, cover]);
      const contentPdf = await this.renderCapoeiraPdfContent(
        documentHtml,
        headerHtml,
        footerHtml,
      );
      const coverPdf = await this.renderCapoeiraPdfCover(coverHtml);
      return Buffer.from(await this.mergePdf(coverPdf, contentPdf));
    } catch (error) {
      throw new AppError(
        `Error at generating PDF for exame ${exame.capoeirista.name}, ${error}`,
      );
    }
  }

  public async getCapoeiraPdf(exameId: string) {
    const exame = await this.capoeiraRepository.getExameMock(
    );
    return await this.printCapoeiraPdf(exame);
  }
}
