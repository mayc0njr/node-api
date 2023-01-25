export class Exame {
  public capoeirista: Capoeirista;
  public prova: Prova;
}
export class Capoeirista {
  public name: string;
  public age: string;
}
export class Prova {
  public local: string;
  public hazards: Hazard[];
}

export class Hazard {
  public type: string;
  public origin: string;
  public consequence: string;
}
