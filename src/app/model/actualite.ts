export class Actualite {
  id: number;
  titre: string;
  description: string;
  dateAjout: Date;
  image : any;
  contentUrl : string;
  actif : boolean
  // @ts-ignore
  constructor(public titre: string, public description: string, public dateAjout: Date, public actif : boolean) {
  }
}
