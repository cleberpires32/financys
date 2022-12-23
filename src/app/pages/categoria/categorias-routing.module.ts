import { CategoriaFormComponent } from './../categorias/categoria-form/categoria-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { defaultFormat } from 'moment';
import { CategoriaListComponent } from '../categorias/categoria-list/categoria-list.component';

const routes: Routes = [
  {path: '', component: CategoriaListComponent},
  {path: ':id/edit', component: CategoriaFormComponent},
  {path: 'new', component: CategoriaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
