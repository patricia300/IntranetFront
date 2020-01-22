export class Portrait {
    id : number;
    nom : string;
    poste : string;
    image : any;
    dateAjout : Date;
    description : string;
    contentUrl : string;
    mois : string;
     // @ts-ignore
    constructor(public nom: string , public poste : string , public description : string,public dateAjout : Date , public mois : string) {}
}
