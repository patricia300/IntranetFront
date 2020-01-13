import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavService } from './service/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ml: string;
  mlSubscription: Subscription;
  constructor(private appService:SideNavService){}
  ngOnInit(): void {
    this.mlSubscription = this.appService.mlSubject.subscribe(
      (ml) => {
        this.ml = ml;
      }
    );
  }

}
