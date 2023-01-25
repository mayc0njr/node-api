import { AppError } from "@shared/errors/AppError";
import { PdfOptions } from "@src/models/PdfOptions";
import ejs from "ejs";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";

export class PdfService {
  public async renderEjs(templatePath: string, content: any): Promise<string> {
    return await ejs.renderFile(templatePath, content, { async: true });
  }
  public async renderPdfContent(
    data: string,
    options: PdfOptions,
    header = "",
    footer = "",
  ): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(data, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      timeout: 0,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      displayHeaderFooter: options.displayHeaderFooter,
      headerTemplate: header,
      footerTemplate: footer,
      printBackground: options.printBackground,
    });

    await browser.close();
    return pdf;
  }
  public async mergePdf(...files: Buffer[]) {
    const pdfResult = await PDFDocument.create();
    if (!files) {
      throw new AppError(`Error at merging PDF: ${files}`);
    }
    for (const file of files) {
      const filePdf = await PDFDocument.load(file);
      const filePages = await pdfResult.copyPages(
        filePdf,
        filePdf.getPageIndices(),
      );
      filePages.forEach(page => {
        pdfResult.addPage(page);
      });
    }
    return await pdfResult.save();
  }
}
