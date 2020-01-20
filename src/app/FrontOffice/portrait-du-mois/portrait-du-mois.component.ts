import { Component, OnInit } from '@angular/core';
import { Portrait } from 'src/app/model/portrait';
import { Subscription } from 'rxjs';
import { PortraitService } from 'src/app/service/portrait.service';

@Component({
  selector: 'app-portrait-du-mois',
  templateUrl: './portrait-du-mois.component.html',
  styleUrls: ['./portrait-du-mois.component.css']
})
export class PortraitDuMoisComponent implements OnInit {
  portraits : Portrait[];
  portraitSub : Subscription;
  Url = 'http://localhost:8000';
  constructor(private portraitService : PortraitService) { }

  ngOnInit() {
    this.portraitSub = this.portraitService.portraitSubject.subscribe(
      (response : Portrait[]) => {
        this.portraits = response;
      }
    );
    this.portraitService.getPortraits();
  }

}
