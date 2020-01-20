import { Injectable } from '@angular/core';
import { Annonce } from '../model/annonce';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8000/api/annonces';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  annonces : Annonce[] = [];
  annonceSubject = new Subject<Annonce[]>();
  annonce : Annonce;

  constructor(private http : HttpClient) { 
    this.getAnnonces();
  }
  emitAnnonces(){
    this.annonceSubject.next(this.annonces);
  }

  getAnnonces(){
    return this.http.get(API_URL + '.json').subscribe(
      (responses : Annonce[]) => {
        this.annonces = responses;
        this.emitAnnonces();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAnnonce(id : number){
    const index = this.annonces.findIndex(d => d.id === id);
    return this.annonces[index];
  }

  postAnnonce(annonce: Annonce) {
    console.log(annonce);
    return this.http.post(API_URL + '.json', annonce).subscribe(
      (response: Annonce) => {
        this.annonces.push(response);
        console.log(response);
      },
      (error) => {
       console.log(error);
      }
    );
  }

  deleteAnnonce(id: number) {
    return this.http.delete(API_URL + '/' + id + '.json').subscribe(
      () => {
        console.log('Suppression avec succes');
        const index = this.annonces.findIndex(d => d.id === id);
        this.annonces.splice(index , 1);
        this.emitAnnonces();
    },
      (error) => {
        console.log(error);
      }
    );
  }

  putAnnonce(id: number, annonce: Annonce) {
    return this.http.put(API_URL + '/' + id + '.json', annonce).subscribe(
      (response: Annonce) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}
