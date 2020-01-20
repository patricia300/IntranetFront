import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { ListeActualiteComponent } from './FrontOffice/liste-actualite/liste-actualite.component';
import { UnActualiteComponent } from './FrontOffice/un-actualite/un-actualite.component';
import { NouveauxEmployeeComponent } from './FrontOffice/nouveaux-employee/nouveaux-employee.component';
import { PortraitDuMoisComponent } from './FrontOffice/portrait-du-mois/portrait-du-mois.component';
import { AcceuilComponent } from './FrontOffice/acceuil/acceuil.component';
import { ActualiteComponent } from './backOffice/actualite/actualite.component';
import { NouveauEmployeComponent } from './backOffice/nouveau-employe/nouveau-employe.component';
import { BHomeComponent } from './backOffice/bhome/bhome.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import { ActualiteService } from './service/actualite.service';
import { MediaObjectService } from './service/media-object.service';
import { NouveauEmployeService } from './service/nouveau-employe.service';
import { ActualiteFormComponent } from './backOffice/actualite/actualite-form/actualite-form.component';
import { ActualiteModifComponent } from './backOffice/actualite/actualite-modif/actualite-modif.component';
import { EmployeNewComponent } from './backOffice/nouveau-employe/employe-new/employe-new.component';
import { ModificationNouveauComponent } from './backOffice/nouveau-employe/modification-nouveau/modification-nouveau.component';
import { ListeComponent } from './backOffice/portrait/liste/liste.component';
import { NouveauComponent } from './backOffice/portrait/nouveau/nouveau.component';
import { EditComponent } from './backOffice/portrait/edit/edit.component';
import { ListeAnnonceComponent } from './backOffice/annonce/liste-annonce/liste-annonce.component';
import { AjoutAnnonceComponent } from './backOffice/annonce/ajout-annonce/ajout-annonce.component';
import { EditAnnonceComponent } from './backOffice/annonce/edit-annonce/edit-annonce.component';
import { AnnonceAcceuilComponent } from './FrontOffice/annonce/annonce-acceuil/annonce-acceuil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListeActualiteComponent,
    UnActualiteComponent,
    NouveauxEmployeeComponent,
    PortraitDuMoisComponent,
    AcceuilComponent,
    ActualiteComponent,
    NouveauEmployeComponent,
    BHomeComponent,
    ActualiteFormComponent,
    ActualiteModifComponent,
    EmployeNewComponent,
    ModificationNouveauComponent,
    ListeComponent,
    NouveauComponent,
    EditComponent,
    ListeAnnonceComponent,
    AjoutAnnonceComponent,
    EditAnnonceComponent,
    AnnonceAcceuilComponent,
   
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
