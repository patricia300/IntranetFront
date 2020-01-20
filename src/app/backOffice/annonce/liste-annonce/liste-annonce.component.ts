import { Component, OnInit, OnDestroy } from '@angular/core';
import { Annonce } from 'src/app/model/annonce';
import { Subscription } from 'rxjs';
import { AnnonceService } from 'src/app/service/annonce.service';

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.css']
})
export class ListeAnnonceComponent implements OnInit,OnDestroy {
  annonces : Annonce[];
  annonceSubscription : Subscription;
  constructor(private annonceService : AnnonceService) {
    this.annonceService.getAnnonces();
   }

  ngOnInit() {
    this.annonceSubscription = this.annonceService.annonceSubject.subscribe(
      (annonces : Annonce[]) => {
        this.annonces = annonces;
      }
    );
    this.annonceService.getAnnonces();
  }

  onDelete(id:number){
    this.annonceService.deleteAnnonce(id);
  }

  ngOnDestroy(){
    this.annonceSubscription.unsubscribe();
  }

}
