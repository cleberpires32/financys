import { CagoriasModule } from './pages/categoria/categorias.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'categorias', loadChildren: () => import('./pages/categoria/categorias.module').then(x => x.CagoriasModule)}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
