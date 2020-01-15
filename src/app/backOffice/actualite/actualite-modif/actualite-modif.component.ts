import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActualiteService } from 'src/app/service/actualite.service';
import { Actualite } from 'src/app/model/actualite';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualite-modif',
  templateUrl: './actualite-modif.component.html',
  styleUrls: ['./actualite-modif.component.css']
})
export class ActualiteModifComponent implements OnInit {
  
  modificationForm: FormGroup;
  actualite : Actualite;
  
  id;

  constructor(private formBuilder: FormBuilder , 
              private actualiteService : ActualiteService ,
              private router : Router,
              private route : ActivatedRoute) { 
                
              }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.actualite = this.actualiteService.getActualite(+this.id);            
    this.initForm();
  }

  initForm() {
      this.modificationForm = this.formBuilder.group({
        id : [this.actualite.id, Validators.required],
        titre: [this.actualite.titre, Validators.required],
        description: [this.actualite.description, Validators.required],
        dateAjout : [this.actualite.dateAjout, Validators.required]
      });
    
}

  onModify() {
    const titre = this.modificationForm.get('titre').value;
    const description = this.modificationForm.get('description').value;
    const dateAjout = this.modificationForm.get('dateAjout').value;
    const actualite = new Actualite(titre, description, dateAjout);
    this.actualiteService.patchActualite(+this.id, actualite);
    this.router.navigate(['actualiteB']);
    this.actualite = null;
  }

}
