import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actualite} from '../../model/actualite';
import {Subscription} from 'rxjs';
import {ActualiteService} from '../../service/actualite.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit, OnDestroy {
  actualites: Actualite[];
  actualiteSubscription: Subscription;
  actualiteForm: FormGroup;
  modificationForm: FormGroup;
  actualite: Actualite;
  constructor(private actualiteService: ActualiteService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.actualiteSubscription = this.actualiteService.actualiteSubject.subscribe(
      (actualites: Actualite[]) => {
        this.actualites = actualites;
      }

    );
    this.actualiteService.emitActualites();
    this.initForm();
  }
  
  initForm() {
    this.actualiteForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave() {
    const titre = this.actualiteForm.get('titre').value;
    const description = this.actualiteForm.get('description').value;
    const dateAjout = new Date();
    const actualite = new Actualite(titre, description, dateAjout);
    this.actualiteService.postActualite(actualite);
    this.actualiteForm.reset();
  }

  onDelete(id: number) {
    this.actualiteService.deleteActualite(id);
  }

  onModBtn(id: number) {
    const index = this.actualites.findIndex(d => d.id === id);
    this.actualite = this.actualites[index];
    this.modificationForm = this.formBuilder.group({
      id : [this.actualite.id, Validators.required],
      titre : [this.actualite.titre, Validators.required],
      description : [this.actualite.description, Validators.required],
      dateAjout : [this.actualite.dateAjout, Validators.required]
    });
  }

  onModify() {
    const id = this.modificationForm.get('id').value;
    const titre = this.modificationForm.get('titre').value;
    const description = this.modificationForm.get('description').value;
    const dateAjout = this.modificationForm.get('dateAjout').value;
    const actualite = new Actualite(titre, description, dateAjout);
    this.actualiteService.patchActualite(id, actualite);
    this.actualite = null;
  }

  ngOnDestroy(): void {
    this.actualiteSubscription.unsubscribe();
  }
}
