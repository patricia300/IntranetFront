import { Component, OnInit } from '@angular/core';
import { Actualite } from 'src/app/model/actualite';
import { Subscription } from 'rxjs';
import { ActualiteService } from 'src/app/service/actualite.service';

@Component({
  selector: 'app-un-actualite',
  templateUrl: './un-actualite.component.html',
  styleUrls: ['./un-actualite.component.css']
})
export class UnActualiteComponent implements OnInit {
  Url = 'http://localhost:8000';
  actualites : Actualite[] = [];
  actualiteSub : Subscription ;
  constructor(private actualiteService : ActualiteService) { }

  ngOnInit() {
    this.actualiteSub = this.actualiteService.actualiteSubject.subscribe(
      (responses : Actualite[]) => {
        this.actualites = responses;
      }
    );
    this.actualiteService.getActualites();
  }

}
