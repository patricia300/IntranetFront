import {Component, OnDestroy, OnInit} from '@angular/core';
import {NouveauEmploye} from '../../model/nouveau-employe';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NouveauEmployeService} from '../../service/nouveau-employe.service';
import {MediaObjectService} from '../../service/media-object.service';
import {MediaObject} from '../../model/media-object';

@Component({
  selector: 'app-nouveau-employe',
  templateUrl: './nouveau-employe.component.html',
  styleUrls: ['./nouveau-employe.component.css']
})
export class NouveauEmployeComponent implements OnInit, OnDestroy {

  nouveauEmployes: NouveauEmploye[];
  nouveauemployeSubscription = new Subscription();
  images: MediaObject[];
  imagesSubscription = new Subscription();
  Url = 'http://localhost:8000';

  constructor(private nouveauEmployeService: NouveauEmployeService) { }

  ngOnInit() {
    this.nouveauemployeSubscription = this.nouveauEmployeService.NouveauemployeSubject.subscribe(
      (nouveauemployes: NouveauEmploye[]) => {
        this.nouveauEmployes = nouveauemployes;
      }
    );
    this.nouveauEmployeService.emitNouveauEmploye();
  }

  onDelete(nouveau : NouveauEmploye){
    this.nouveauEmployeService.deleteNouveauEmploye(nouveau);
  }

  ngOnDestroy(): void {
    this.nouveauemployeSubscription.unsubscribe();
  }
}
