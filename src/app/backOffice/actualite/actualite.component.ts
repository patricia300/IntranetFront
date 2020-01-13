import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actualite} from '../../model/actualite';
import {Subscription} from 'rxjs';
import {ActualiteService} from '../../service/actualite.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit, OnDestroy {
  actualites: Actualite[];
  actualiteSubscription: Subscription;
  actualiteForm: FormGroup;
 
  actualite: Actualite;
  constructor(private actualiteService: ActualiteService) {}

  ngOnInit() {
    this.actualiteSubscription = this.actualiteService.actualiteSubject.subscribe(
      (actualites: Actualite[]) => {
        this.actualites = actualites;
      }
    );
    this.actualiteService.emitActualites();
  }

  onDelete(id: number) {
    this.actualiteService.deleteActualite(id);
  }

  ngOnDestroy(): void {
    this.actualiteSubscription.unsubscribe();
  }
}
