import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/model/annonce';

@Component({
  selector: 'app-ajout-annonce',
  templateUrl: './ajout-annonce.component.html',
  styleUrls: ['./ajout-annonce.component.css']
})
export class AjoutAnnonceComponent implements OnInit {
  annonceForm : FormGroup;

  constructor(
    private annonceService : AnnonceService,
    private formBuilder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.annonceForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required]
    });
}

onSave() {
  const titre = this.annonceForm.get('titre').value;
  const description = this.annonceForm.get('description').value;
  const dateAjout = new Date();
  const annonce = new Annonce(titre, description, dateAjout);
  this.annonceService.postAnnonce(annonce)
  this.router.navigate(['annonce']);
}

}
