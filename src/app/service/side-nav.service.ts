import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }
  ml = '2px';
  mlSubject = new Subject<string>();

  emitMlSubject() {
    this.mlSubject.next(this.ml);
  }

  onOpenNav() {
    this.ml = '254px';
    this.emitMlSubject();
  }

  onCloseNav() {
    this.ml = '4px';
    this.emitMlSubject();
  }
}
