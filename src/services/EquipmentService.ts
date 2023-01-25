import { AppError } from "@shared/errors/AppError";
import { CapoeiraRepository } from "@src/repositories/capoeira/CapoiraRepository";

export class CapoeiraService {
  constructor(private repository: CapoeiraRepository) {}

  public async getExame(
  ) {
    try {
      const exame = await this.repository.getExameMock(
      );
    } catch (error) {
      console.log(error);
      throw new AppError(`Error while getting Exame. - ${error}`);
    }
  }
}
