import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActualiteService } from 'src/app/service/actualite.service';
import { Actualite } from 'src/app/model/actualite';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8000/api/actualites';

@Component({
  selector: 'app-actualite-form',
  templateUrl: './actualite-form.component.html',
  styleUrls: ['./actualite-form.component.css']
})
export class ActualiteFormComponent implements OnInit {
  actualiteForm: FormGroup;

  constructor(private actualiteService: ActualiteService ,
              private formBuilder: FormBuilder , 
              private router: Router ) {}

  ngOnInit() {
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
    this.router.navigate(['actualiteB']);
  }

}
