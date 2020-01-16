import { Injectable } from '@angular/core';
import {NouveauEmploye} from '../model/nouveau-employe';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { MediaObjectService } from './media-object.service';
import {MediaObject} from '../model/media-object';

const API_URL = 'http://127.0.0.1:8000/api/nouveau_employes';
const IMAGE_URL = 'http://127.0.0.1:8000/api/media_objects';

@Injectable({
  providedIn: 'root'
})
export class NouveauEmployeService {
  nouveauEmployes: NouveauEmploye[] = [];
  NouveauemployeSubject = new Subject<NouveauEmploye[]>();
  mediaObject: MediaObject[] = [];
  MediaObjectsub: Subscription;

  constructor(private http: HttpClient, private mediaObjectService: MediaObjectService) {
    this.getNouveauemployes();
  }

  emitNouveauEmploye() {
    this.NouveauemployeSubject.next(this.nouveauEmployes);
  }

   getNouveauemployes() {
    return this.http.get(API_URL + '.json').subscribe(
      (responses: NouveauEmploye[]) => {
       this.nouveauEmployes = responses;
       this.emitNouveauEmploye();
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  getNouveau(id : number){
      let index = this.nouveauEmployes.findIndex(d => d.id === id);
      console.log(index);
      return this.nouveauEmployes[index];
  }
  
  postNouveauEmploye(nouveauEmploye: NouveauEmploye , fd : FormData) { 
    this.http.post(IMAGE_URL, fd).subscribe(
      (response : any) => {
        nouveauEmploye.image  = '/api/media_objects/' + response.id;
        nouveauEmploye.contentUrl = response.contentUrl;
        this.mediaObject.push(response);
        this.mediaObjectService.emitImages();
        this.http.post(API_URL + '.json', nouveauEmploye).subscribe(
           (responseN: NouveauEmploye) => {
             this.nouveauEmployes.push(responseN);
             this.emitNouveauEmploye();
           },
           (error: Error) => {
             console.log(error);
           }
         );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNouveauEmploye(deleted : NouveauEmploye){
    let i , tmp = '';
    for(i=19 ; i < deleted.image.length ; i++){
      tmp = tmp + deleted.image[i];
    }
    let idImage = +tmp
    console.log(tmp);
    this.http.delete(API_URL + '/' + deleted.id + '.json').subscribe(
      () => {
        console.log('suppression avec succes')
        const index = this.nouveauEmployes.findIndex(d => d.id === deleted.id);
        this.nouveauEmployes.splice(index,1);
        this.emitNouveauEmploye();
        this.mediaObjectService.deleteImage(idImage)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  putNouveau(id:number , nouveau : NouveauEmploye , fd : FormData , idImage : number){
    this.http.post(IMAGE_URL, fd).subscribe(
      (response : any) => {
        nouveau.image  = '/api/media_objects/' + response.id;
        nouveau.contentUrl = response.contentUrl;
        this.mediaObject.push(response);
        this.mediaObjectService.emitImages();
        this.http.put(API_URL + '/' + id + '.json', nouveau).subscribe(
          (response : NouveauEmploye) => {
            let index = this.nouveauEmployes.findIndex(d => d.id === id);
            this.nouveauEmployes.splice(index , 1);
            this.nouveauEmployes.push(response);
            this.emitNouveauEmploye();
          }
      );
      this.mediaObjectService.deleteImage(idImage);
      },
      (error) => {
        console.log(error);
      }
     
    );   
  }
  putNouveauSansImage(id:number , nouveau : NouveauEmploye){
        this.http.put(API_URL + '/' + id + '.json', nouveau).subscribe(
          (response : NouveauEmploye) => {
            let index = this.nouveauEmployes.findIndex(d => d.id === id);
            this.nouveauEmployes.splice(index , 1);
            this.nouveauEmployes.push(response);
            this.emitNouveauEmploye();
          },
          (error) => {
            console.log(error);
          }
      );
  }

}
