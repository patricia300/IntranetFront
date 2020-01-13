import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceuilComponent } from './FrontOffice/acceuil/acceuil.component';
import { ListeActualiteComponent } from './FrontOffice/liste-actualite/liste-actualite.component';
import { ListeGroupeTalysComponent } from './FrontOffice/liste-groupe-talys/liste-groupe-talys.component';
import { ActualiteComponent } from './backOffice/actualite/actualite.component';
import { NouveauEmployeComponent } from './backOffice/nouveau-employe/nouveau-employe.component';
import { ActualiteFormComponent } from './backOffice/actualite/actualite-form/actualite-form.component';
import { ActualiteModifComponent } from './backOffice/actualite/actualite-modif/actualite-modif.component';


const routes: Routes = [
  { path : 'groupeTalys' , component : ListeGroupeTalysComponent },
  { path : 'actualite' , component : ListeActualiteComponent },
  { path : '' , component : AcceuilComponent},
  { path: 'actualiteB', component: ActualiteComponent},
  { path: 'nouveau', component: NouveauEmployeComponent},
  { path: 'actualiteform' , component: ActualiteFormComponent},
  { path: 'actualiteModif/:id' , component: ActualiteModifComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
