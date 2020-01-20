import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actualite} from '../../model/actualite';
import {Subscription} from 'rxjs';
import {ActualiteService} from '../../service/actualite.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit, OnDestroy {
  actualites: Actualite[];
  actualiteSubscription: Subscription;
  Url = 'http://localhost:8000';
  actualite: Actualite;
  
  constructor(private actualiteService: ActualiteService) {}

  ngOnInit() {
    this.actualiteSubscription = this.actualiteService.actualiteSubject.subscribe(
      (actualites: Actualite[]) => {
        this.actualites = actualites;
      }
    );
    this.actualiteService.getActualites();
  }

  onDelete(actualite : Actualite) {
    this.actualiteService.deleteActualite(actualite);
  }

  ngOnDestroy(): void {
    this.actualiteSubscription.unsubscribe();
  }
}
