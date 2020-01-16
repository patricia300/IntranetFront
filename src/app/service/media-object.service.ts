import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';
import {MediaObject} from '../model/media-object';
import {Subject} from 'rxjs';

const API_URL = 'http://127.0.0.1:8000/api/media_objects';
const GET_URL = 'http://127.0.0.1:8000';
@Injectable({
  providedIn: 'root'
})

export class MediaObjectService {
  images: MediaObject[];
  imagesSubject = new Subject<MediaObject[]>();
  image: any;
  constructor(private http: HttpClient) {
    this.getImages();
  }

  emitImages() {
    this.imagesSubject.next(this.images);
  }

  getImages() {
    this.http.get(API_URL + '.json').subscribe(
      (responses: MediaObject[]) => {
        this.images = responses;
        this.emitImages();
      },
      (erreur: Error) => {
        console.log(erreur);
      }
    );
  }
  
   getImage(id: string) {
     this.http.get(GET_URL + id + '.json').subscribe(
      (response: MediaObject) => {
        console.log(response.contentUrl);
         return this.image.contentUrl = response.contentUrl;
      },
      (erreur) => {
        console.log(erreur);
      }
    );
  }
  
  /*upload(fd: FormData) {
     this.http.post(API_URL, fd).subscribe(
      (response : any) => {
        console.log(response.id);
        this.image = response;
        return response.id;
        this.images.push(response);
        this.emitImages();
      },
      () => {
        console.log(error);
      }
    );
  }*/

  deleteImage(id:number){
    return this.http.delete(API_URL + '/' + id + '.json').subscribe(
      () => {
        console.log('Suppression avec succes');
        const index = this.images.findIndex(d => d.id == id);
        this.images.splice(index,1);
        this.emitImages();
      },
      (error) => {console.log(error);}
    );
  }

}
