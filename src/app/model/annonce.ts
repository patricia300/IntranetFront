export class Annonce {
    id: number;
    titre: string;
    description: string;
    dateAjout: Date;
    actif : boolean
  // @ts-ignore
  constructor(public titre: string, public description: string, public dateAjout: Date , public actif : boolean) {
  }
}
