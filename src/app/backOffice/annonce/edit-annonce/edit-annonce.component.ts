import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/model/annonce';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {

  modificationForm: FormGroup;
  annonce : Annonce;
  id;
  constructor(
    private formBuilder : FormBuilder,
    private annonceService : AnnonceService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.annonce = this.annonceService.getAnnonce(+this.id);
    this.initForm();
  }

  
  initForm() {
    this.modificationForm = this.formBuilder.group({
      id : [this.annonce.id, Validators.required],
      titre: [this.annonce.titre, Validators.required],
      description: [this.annonce.description, Validators.required],
      dateAjout : [''],
      actif : [this.annonce.actif]
    });   
}

onModify() {
  const titre = this.modificationForm.get('titre').value;
  const description = this.modificationForm.get('description').value;
  const dateAjout = this.modificationForm.get('dateAjout').value;
  const actif = this.modificationForm.get('actif').value;
  const annonce = new Annonce(titre, description, dateAjout , actif);
  this.annonceService.putAnnonce(this.id , annonce);
  this.router.navigate(['annonce']);

}


}
