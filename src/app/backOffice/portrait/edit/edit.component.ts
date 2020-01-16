import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortraitService } from 'src/app/service/portrait.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaObject } from 'src/app/model/media-object';
import { Portrait } from 'src/app/model/portrait';
import { MediaObjectService } from 'src/app/service/media-object.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectedFile = null;
  portraitForm: FormGroup;
  portrait : Portrait;
  Url = 'http://localhost:8000';
  id;

  constructor(
    private portraitService : PortraitService,
    private formBuilder : FormBuilder,
    private router  : Router ,
    private route : ActivatedRoute,
    private mediaService : MediaObjectService

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.portrait = this.portraitService.getPortrait(+this.id);
    this.initForm();
  }

  initForm(){
    this.portraitForm = this.formBuilder.group({
      id : [this.portrait.id, Validators.required],
      nom : [this.portrait.nom, Validators.required],
      poste : [this.portrait.poste, Validators.required],
      description : [this.portrait.description, Validators.required],
      date : [this.portrait.dateAjout, Validators.required]
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
   
  onModify(){
    const nom = this.portraitForm.get('nom').value;
    const poste = this.portraitForm.get('poste').value;
    const description = this.portraitForm.get('description').value;
    const date = this.portraitForm.get('date').value;
    const portrait = new Portrait(nom ,poste , description , date);

    if(this.selectedFile != null){
      const fd = new FormData();
      console.log(this.selectedFile);
      fd.append('file' , this.selectedFile);
      console.log(fd);

      let i , tmp = '';
      for(i=19 ; i < this.portrait.image.length ; i++){
        tmp = tmp + this.portrait.image[i];
      }
      let idImage = +tmp;
      console.log(tmp);

      this.portraitService.putPortrait(+this.id,portrait , fd, idImage);
      //this.mediaService.deleteImage(idImage);
    }
    else{
      this.portraitService.putPortraitSansImage(this.id , portrait);
    }

    this.router.navigate(['portrait']);
  }


}
