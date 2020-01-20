import { Component, OnInit } from '@angular/core';
import { NouveauEmploye } from 'src/app/model/nouveau-employe';
import { Subscription } from 'rxjs';
import { NouveauEmployeService } from 'src/app/service/nouveau-employe.service';

@Component({
  selector: 'app-nouveaux-employee',
  templateUrl: './nouveaux-employee.component.html',
  styleUrls: ['./nouveaux-employee.component.css']
})
export class NouveauxEmployeeComponent implements OnInit {
  nouveaux : NouveauEmploye[];
  nouveauSub : Subscription;
  Url = 'http://localhost:8000'
  constructor(private nouveauService : NouveauEmployeService) { }

  ngOnInit() {
    this.nouveauSub = this.nouveauService.NouveauemployeSubject.subscribe(
      (response : NouveauEmploye[]) => {
        this.nouveaux = response;
      }
    );
    this.nouveauService.getNouveauemployes();
  }

}
