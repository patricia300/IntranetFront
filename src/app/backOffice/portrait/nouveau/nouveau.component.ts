import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortraitService } from 'src/app/service/portrait.service';
import { Router } from '@angular/router';
import { Portrait } from 'src/app/model/portrait';

@Component({
  selector: 'app-nouveau',
  templateUrl: './nouveau.component.html',
  styleUrls: ['./nouveau.component.css']
})
export class NouveauComponent implements OnInit{
  selectedFile = null;
  portraitForm : FormGroup;
  constructor(
    private portraitService : PortraitService,
    private formBuilder : FormBuilder , 
    private router : Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.portraitForm = this.formBuilder.group({
      nom : ['', Validators.required],
      poste : ['', Validators.required],
      description : ['', Validators.required]
    })
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
   
  onSave() {
    const fd = new FormData();
    console.log(this.selectedFile);
    fd.append('file' , this.selectedFile);
    console.log(fd);
   
    let nom = this.portraitForm.get('nom').value;
    let poste = this.portraitForm.get('poste').value;
    let description = this.portraitForm.get('description').value;
    let date = new Date();
    let portrait = new Portrait(nom, poste , description ,date );
    console.log(portrait);
    this.portraitService.postPortrait(portrait , fd);
    this.router.navigate(['portrait']);
  }

}
