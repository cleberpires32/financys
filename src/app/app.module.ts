
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataBase } from './in-memory-database';
import { EntryListComponent } from './pages/entries/entry-list/entry-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaFormComponent,
    CategoriaListComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
