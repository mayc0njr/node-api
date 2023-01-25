import { Exame } from "@models/Exame";
import "dotenv/config";
import apiConfig from "./AxiosConfig";

export class CapoeiraRepository {

  public async getExameMock(): Promise<Exame> {
    const value: Exame = {
      capoeirista: {
        name: "José Mangual",
        age: "13",
      },
      prova: {
        local: "Rua de cima",
        hazards: [
          {
            type: "Queda",
            origin: "Alturas diferentes",
            consequence: "Lesões e Fraturas",
          },
          {
            type: "Golpe",
            origin: "Outro Capoeirista",
            consequence: "Lesões e Fraturas",
          },
        ],
      },
    };
    return Promise.resolve(value);
  }
}
