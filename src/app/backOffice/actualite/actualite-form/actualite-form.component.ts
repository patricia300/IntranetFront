import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActualiteService } from 'src/app/service/actualite.service';
import { Actualite } from 'src/app/model/actualite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualite-form',
  templateUrl: './actualite-form.component.html',
  styleUrls: ['./actualite-form.component.css']
})
export class ActualiteFormComponent implements OnInit {
  selectedFile = null;
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
        description: ['', Validators.required],
        actif : ['']
      });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  onSave() {
    const titre = this.actualiteForm.get('titre').value;
    const description = this.actualiteForm.get('description').value;
    const actif = this.actualiteForm.get('actif').value;
    const dateAjout = new Date();
    const actualite = new Actualite(titre, description, dateAjout , actif);
    
    if(this.selectedFile != null){
      const fd = new FormData();
      console.log(this.selectedFile);
      fd.append('file' , this.selectedFile);
      console.log(fd);
      this.actualiteService.postActualite(actualite , fd);
    }
    else{
      this.actualiteService.postActualiteSansImage(actualite);
    }
   
    this.router.navigate(['actualiteB']);
  }

}
