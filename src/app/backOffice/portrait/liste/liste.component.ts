import { Component, OnInit, OnDestroy } from '@angular/core';
import { Portrait } from 'src/app/model/portrait';
import { Subscription } from 'rxjs';
import { PortraitService } from 'src/app/service/portrait.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit , OnDestroy {
  portraits : Portrait[] = [];
  portraitSuscription = new Subscription();
  Url = 'http://localhost:8000';

  constructor(private portraitService : PortraitService) { }

  ngOnInit() {
    this.portraitSuscription = this.portraitService.portraitSubject.subscribe(
      (portraits : Portrait[]) => {
        this.portraits = portraits;
      }
    );
    this.portraitService.getPortraits();
  }

  onDelete(portrait : Portrait){
    this.portraitService.deletePortrait(portrait);
  }

  ngOnDestroy(){
    this.portraitSuscription.unsubscribe();
  }

}
