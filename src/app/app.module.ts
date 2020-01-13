import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListeActualiteComponent } from './FrontOffice/liste-actualite/liste-actualite.component';
import { UnActualiteComponent } from './FrontOffice/un-actualite/un-actualite.component';
import { NouveauxEmployeeComponent } from './FrontOffice/nouveaux-employee/nouveaux-employee.component';
import { GroupeTalysComponent } from './FrontOffice/groupe-talys/groupe-talys.component';
import { PortraitDuMoisComponent } from './FrontOffice/portrait-du-mois/portrait-du-mois.component';
import { AcceuilComponent } from './FrontOffice/acceuil/acceuil.component';
import { ListeGroupeTalysComponent } from './FrontOffice/liste-groupe-talys/liste-groupe-talys.component';
import { ActualiteComponent } from './backOffice/actualite/actualite.component';
import { NouveauEmployeComponent } from './backOffice/nouveau-employe/nouveau-employe.component';
import { BHomeComponent } from './backOffice/bhome/bhome.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import { ActualiteService } from './service/actualite.service';
import { MediaObjectService } from './service/media-object.service';
import { NouveauEmployeService } from './service/nouveau-employe.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListeActualiteComponent,
    UnActualiteComponent,
    NouveauxEmployeeComponent,
    GroupeTalysComponent,
    PortraitDuMoisComponent,
    AcceuilComponent,
    ListeGroupeTalysComponent,
    ActualiteComponent,
    NouveauEmployeComponent,
    BHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorAllModule
  ],
  providers: [
    ActualiteService,
    MediaObjectService,
    NouveauEmployeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
