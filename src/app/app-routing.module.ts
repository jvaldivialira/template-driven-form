import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactFormPageComponent } from './contact-form-page/contact-form-page.component';
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactFormPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }