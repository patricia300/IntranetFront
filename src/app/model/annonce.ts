export class Annonce {
    id: number;
    titre: string;
    description: string;
     dateAjout: Date;
  // @ts-ignore
  constructor(public titre: string, public description: string, public dateAjout: Date) {
  }
}
