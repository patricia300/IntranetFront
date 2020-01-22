import { Injectable } from '@angular/core';
import {Actualite} from '../model/actualite';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';
import { MediaObjectService } from './media-object.service';

const API_URL = 'http://localhost:8000/api/actualites';
const IMAGE_URL = 'http://127.0.0.1:8000/api/media_objects';


@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  actualites: Actualite[] = [];
  erreur: string;
  actualiteSubject = new Subject<Actualite[]>();
  actualite : Actualite;

  constructor(private http: HttpClient , private mediaObjectService: MediaObjectService) {
    this.getActualites();
  }

  emitActualites() {
    this.actualiteSubject.next(this.actualites);
  }

  getActualites() {
      return this.http.get(API_URL + '.json').subscribe(
        (response: Actualite[]) => {
          this.actualites = response;
          this.emitActualites();
        },
      () => {
          console.log(error);
      }
      );
  }

  getActualite(id : number){
    const index = this.actualites.findIndex(d => d.id === id);
    return this.actualites[index];

  }

  postActualite(actualite: Actualite , fd : FormData) {
    this.http.post(IMAGE_URL , fd).subscribe(
      (response : any) => {
        actualite.image = '/api/media_objects/' + response.id;
        actualite.contentUrl = response.contentUrl;
        this.http.post(API_URL + '.json', actualite).subscribe(
          (response: Actualite) => {
            this.actualites.push(response);
            this.emitActualites();
          },
          () => {
           console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  postActualiteSansImage(actualite : Actualite){
    this.http.post(API_URL + '.json' , actualite).subscribe(
      (response : Actualite) => {
        this.actualites.push(response);
        this.emitActualites();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteActualite(deleted: Actualite) {
    let i , tmp = '';
    for(i=19 ; i < deleted.image.length ; i++){
      tmp = tmp + deleted.image[i];
    }
    let idImage = +tmp
    console.log(tmp);
    this.http.delete(API_URL + '/' + deleted.id + '.json').subscribe(
      () => {
        console.log('Suppression avec succes');
        const index = this.actualites.findIndex(d => d.id === deleted.id);
        this.actualites.splice(index , 1);
        this.emitActualites();
        this.mediaObjectService.deleteImage(idImage);
    },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteActualiteSansImage(id : number){
    this.http.delete(API_URL + '/' + id + '.json').subscribe(
      () => {
        const index = this.actualites.findIndex(d => d.id === id);
        this.actualites.splice(index , 1);
        this.emitActualites();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  patchActualite(id: number, actualite: Actualite , fd : FormData , idImage:number) {
    this.http.post(IMAGE_URL,fd).subscribe(
      (response : any) => {

        actualite.image = '/api/media_objects/' + response.id;
        actualite.contentUrl = response.contentUrl;

        this.http.put(API_URL + '/' + id + '.json', actualite).subscribe(
          (response: Actualite) => {
              console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
        this.mediaObjectService.deleteImage(idImage);
      },
      (error) => {
        console.log(error)
      }
    );
    
  }

  patchActualiteSansImage(id: number, actualite: Actualite) {
    return this.http.put(API_URL + '/' + id + '.json', actualite).subscribe(
      (response: Actualite) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
