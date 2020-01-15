import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NouveauEmploye } from 'src/app/model/nouveau-employe';
import { NouveauEmployeService } from 'src/app/service/nouveau-employe.service';
import { MediaObjectService } from 'src/app/service/media-object.service';

@Component({
  selector: 'app-modification-nouveau',
  templateUrl: './modification-nouveau.component.html',
  styleUrls: ['./modification-nouveau.component.css']
})
export class ModificationNouveauComponent implements OnInit {

  nouveauEmployeForm: FormGroup;
  nouveau : NouveauEmploye;
  Url = 'http://localhost:8000';
  selectedFile = null;
  id;
  
  constructor(private formBuilder : FormBuilder,
              private router: Router,
              private route : ActivatedRoute,
              private nouveauService : NouveauEmployeService,
              private mediaService : MediaObjectService) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.nouveau = this.nouveauService.getNouveau(+this.id);
    this.initForm();
    
  }

  initForm() {
    this.nouveauEmployeForm = this.formBuilder.group({
      nom : [this.nouveau.nom, Validators.required],
      poste : [this.nouveau.poste, Validators.required],
     // image : ['',Validators.required]
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  
  onModify(){
    const fd = new FormData();
    console.log(this.selectedFile);
    fd.append('file' , this.selectedFile);
    console.log(fd);

    const nom = this.nouveauEmployeForm.get('nom').value;
    const poste = this.nouveauEmployeForm.get('poste').value;
    const nouveau = new NouveauEmploye(nom , poste);

    this.nouveauService.putNouveau(+this.id , nouveau , fd);

    let i , tmp = '';
    for(i=19 ; i < this.nouveau.image.length ; i++){
      tmp = tmp + this.nouveau.image[i];
    }
    let idImage = +tmp;
    console.log(tmp);
    this.mediaService.deleteImage(idImage);

    this.router.navigate(['nouveau']);
  }


}
