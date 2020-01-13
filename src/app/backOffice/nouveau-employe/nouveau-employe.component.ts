import {Component, OnDestroy, OnInit} from '@angular/core';
import {NouveauEmploye} from '../../model/nouveau-employe';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NouveauEmployeService} from '../../service/nouveau-employe.service';
import {MediaObjectService} from '../../service/media-object.service';
import {MediaObject} from '../../model/media-object';

@Component({
  selector: 'app-nouveau-employe',
  templateUrl: './nouveau-employe.component.html',
  styleUrls: ['./nouveau-employe.component.css']
})
export class NouveauEmployeComponent implements OnInit, OnDestroy {
  nouveauEmployes_I: NouveauEmploye[];
  nouveauEmployes: NouveauEmploye[];
  nouveauemployeSubscription = new Subscription();
  images: MediaObject[];
  imagesSubscription = new Subscription();
  nouveauEmployeForm: FormGroup;
  selectedFile = null;
  Url = 'http://localhost:8000';
  resp = { contentUrl: ''};
  constructor(private nouveauEmployeService: NouveauEmployeService,
              private formBuilder: FormBuilder,
              private mediaObjectService: MediaObjectService) { }

  ngOnInit() {
    this.nouveauemployeSubscription = this.nouveauEmployeService.NouveauemployeSubject.subscribe(
      (nouveauemployes: NouveauEmploye[]) => {
        this.nouveauEmployes = nouveauemployes;
      }
    );
    this.imagesSubscription = this.mediaObjectService.imagesSubject.subscribe(
      (responses:MediaObject[]) => {
        this.images = responses;
      }
    );
    this.nouveauEmployeService.getNouveauemployes();
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
    //let image = '/api/media_objects/' + this.mediaObjectService.upload(fd);

    let nom = this.nouveauEmployeForm.get('nom').value;
    let poste = this.nouveauEmployeForm.get('poste').value;
   // let image = '/api/media_objects/' + this.nouveauEmployeForm.get('image').value;
    //console.log(image);
    let nouveauEmploye = new NouveauEmploye(nom, poste);
    console.log(nouveauEmploye);
    this.nouveauEmployeService.postNouveauEmploye(nouveauEmploye , fd);
    //this.nouveauEmployeForm.reset();
  }
 
  /*onUpload() {
    const fd = new FormData();
    console.log(this.selectedFile);
    fd.append('file' , this.selectedFile);
    console.log(fd);
    this.mediaObjectService.upload(fd);
  }*/

  onDelete(nouveau : NouveauEmploye){
    console.log(nouveau);
    this.nouveauEmployeService.deleteNouveauEmploye(nouveau);
  }
  ngOnDestroy(): void {
    this.nouveauemployeSubscription.unsubscribe();
    this.imagesSubscription.unsubscribe();
  }
}
