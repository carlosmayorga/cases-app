import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CasesComponent } from './pages/cases/cases.component';
import { CaseComponent } from './pages/case/case.component';

const routes: Routes = [
  { path: 'cases', component: CasesComponent },
  { path: 'case/:id', component: CaseComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'cases'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
