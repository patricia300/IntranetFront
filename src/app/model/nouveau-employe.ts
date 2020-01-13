import { MediaObject } from './media-object';

export class NouveauEmploye {
  id: number;
  nom: string;
  poste: string;
  image: any;
  contentUrl : string;

  // @ts-ignore
  constructor(public nom: string, public poste: string /*,public image: string*/) {
  }

}
