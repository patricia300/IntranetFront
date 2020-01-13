import { Injectable } from '@angular/core';
import {Actualite} from '../model/actualite';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {error} from 'util';
const API_URL = 'http://localhost:8000/api/actualites';
@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  actualites: Actualite[] = [];
  erreur: string;
  actualiteSubject = new Subject<Actualite[]>();
  constructor(private http: HttpClient) {
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
  postActualite(actualite: Actualite) {
    return this.http.post(API_URL + '.json', actualite).subscribe(
      (response: Actualite) => {
        this.actualites.push(response);
        this.emitActualites();
      },
      () => {
       console.log(error);
      }
    );
  }
  deleteActualite(id: number) {
    return this.http.delete(API_URL + '/' + id + '.json').subscribe(
      () => {
        console.log('Suppression avec succes');
        const index = this.actualites.findIndex(d => d.id === id);
        this.actualites.splice(index , 1);
        this.emitActualites();
    },
      () => {
        console.log(error());
      }
    );
  }
  patchActualite(id: number, actualite: Actualite) {
    return this.http.put(API_URL + '/' + id + '.json', actualite).subscribe(
      (response: Actualite) => {
        const index = this.actualites.findIndex(d => d.id === id);
        this.actualites.splice(index , 1);
        this.actualites.push(response);
        this.emitActualites();
      },
      () => {
        console.log(error);
      }
    );
  }
}
