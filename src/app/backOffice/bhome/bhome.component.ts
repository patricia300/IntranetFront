import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/service/side-nav.service';

@Component({
  selector: 'app-bhome',
  templateUrl: './bhome.component.html',
  styleUrls: ['./bhome.component.css']
})
export class BHomeComponent implements OnInit {
  width: string;
  navStatut;
  constructor(private appService: SideNavService) {
    this.width = '0px';
    this.navStatut = false;
   }

  ngOnInit() {
  }
  onOpenNav() {
    this.width = '250px';
    this.appService.onOpenNav();
    this.navStatut = true;
  }

  onCloseNav() {
    this.width = '0px';
    this.appService.onCloseNav();
    this.navStatut = false;
  }
}
