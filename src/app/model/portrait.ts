export class Portrait {
    id : number;
    nom : string;
    poste : string;
    image : any;
    dateAjout : Date;
    contentUrl : string;
     // @ts-ignore
    constructor(public nom: string , public poste : string , public dateAjout : Date) {}
}