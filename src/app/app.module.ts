import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaFormComponent,
    CategoriaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
