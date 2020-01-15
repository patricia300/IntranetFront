import { Injectable, OnDestroy } from '@angular/core';
import { Portrait } from '../model/portrait';
import { Subject, Subscription } from 'rxjs';
import { MediaObject } from '../model/media-object';
import { HttpClient } from '@angular/common/http';
import { MediaObjectService } from './media-object.service';

const API_URL = 'http://127.0.0.1:8000/api/portrait_du_mois';
const IMAGE_URL = 'http://127.0.0.1:8000/api/media_objects';

@Injectable({
  providedIn: 'root'
})
export class PortraitService implements OnDestroy {
 
  portraits : Portrait[] = [];
  portraitSubject = new Subject<Portrait[]>();
  mediaObjects : MediaObject[] = [];
  mediaSub : Subscription;

  constructor(private http: HttpClient, private mediaObjectService: MediaObjectService) { 
    this.getPortraits();
  }

  emitPortrait(){
    this.portraitSubject.next(this.portraits);
  }

  getPortraits(){
    return this.http.get(API_URL + '.json').subscribe(
      (responses : Portrait[]) => {
        this.portraits = responses;
        this.emitPortrait();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPortrait(id:number){
    let index = this.portraits.findIndex(d => d.id === id);
    return this.portraits[index];
  }

  postPortrait(portrait: Portrait , fd : FormData) { 
    this.http.post(IMAGE_URL, fd).subscribe(
      (response : any) => {
        portrait.image  = '/api/media_objects/' + response.id;
        portrait.contentUrl = response.contentUrl;
        this.mediaObjects.push(response);
        this.mediaObjectService.emitImages();
        this.http.post(API_URL + '.json', portrait).subscribe(
           (responseP: Portrait) => {
             this.portraits.push(responseP);
             this.emitPortrait();
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

  
  deletePortrait(deleted : Portrait){
    let i , tmp = '';
    for(i=19 ; i < deleted.image.length ; i++){
      tmp = tmp + deleted.image[i];
    }
    let idImage = +tmp
    console.log(tmp);
    this.http.delete(API_URL + '/' + deleted.id + '.json').subscribe(
      () => {
        console.log('suppression avec succes')
        const index = this.portraits.findIndex(d => d.id === deleted.id);
        this.portraits.splice(index,1);
        this.emitPortrait();
        this.mediaObjectService.deleteImage(idImage)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  putPortrait(id:number , portrait : Portrait , fd : FormData){
    this.http.post(IMAGE_URL, fd).subscribe(
      (response : any) => {
        portrait.image  = '/api/media_objects/' + response.id;
        portrait.contentUrl = response.contentUrl;
        this.mediaObjects.push(response);
        this.mediaObjectService.emitImages();
        this.http.put(API_URL + '/' + id + '.json', portrait).subscribe(
          (response : Portrait) => {
            let index = this.portraits.findIndex(d => d.id === id);
            this.portraits.splice(index , 1);
            this.portraits.push(response);
            this.emitPortrait();
          }
      );
      },
      (error) => {
        console.log(error);
      }
    );
      
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

}
