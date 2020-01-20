import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Annonce } from 'src/app/model/annonce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annonce-acceuil',
  templateUrl: './annonce-acceuil.component.html',
  styleUrls: ['./annonce-acceuil.component.css']
})
export class AnnonceAcceuilComponent implements OnInit,OnDestroy {
  annonces : Annonce[];
  annonceSub : Subscription;
  constructor(private annonceService : AnnonceService) { }

  ngOnInit() {
    this.annonceSub = this.annonceService.annonceSubject.subscribe(
      (responses : Annonce[]) => {
        this.annonces = responses;
      }
    );
    this.annonceService.getAnnonces();
  }

  ngOnDestroy(): void {
    this.annonceSub.unsubscribe;
  }

}

