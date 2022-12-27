import { CategoriasModule } from './pages/categoria/categorias.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'categorias', loadChildren: () => import('./pages/categoria/categorias.module').then(x => x.CategoriasModule)}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class AppRoutingModule { }
