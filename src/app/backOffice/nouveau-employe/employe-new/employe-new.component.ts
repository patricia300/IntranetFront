import { Component, OnInit } from '@angular/core';
import { NouveauEmployeService } from 'src/app/service/nouveau-employe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NouveauEmploye } from 'src/app/model/nouveau-employe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe-new',
  templateUrl: './employe-new.component.html',
  styleUrls: ['./employe-new.component.css']
})
export class EmployeNewComponent implements OnInit {
  selectedFile = null;
  nouveauEmployeForm: FormGroup;

  constructor(private nouveauEmployeService: NouveauEmployeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.nouveauEmployeForm = this.formBuilder.group({
      nom : ['', Validators.required],
      poste : ['', Validators.required],
     // image : ['',Validators.required]
    });
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
   
    let nom = this.nouveauEmployeForm.get('nom').value;
    let poste = this.nouveauEmployeForm.get('poste').value;
    
    let nouveauEmploye = new NouveauEmploye(nom, poste);
    console.log(nouveauEmploye);
    this.nouveauEmployeService.postNouveauEmploye(nouveauEmploye , fd);
    this.router.navigate(['nouveau']);
  }
 
    /*onUpload() {
    const fd = new FormData();
    console.log(this.selectedFile);
    fd.append('file' , this.selectedFile);
    console.log(fd);
    this.mediaObjectService.upload(fd);
  }*/



}
