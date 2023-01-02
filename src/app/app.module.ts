
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataBase } from './in-memory-database';
import { EntryListComponent } from './pages/entries/entry-list/entry-list.component';
import { EntryFormComponent } from './pages/entries/entry-form/entry-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';

import { IMaskModule } from "angular-imask";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaFormComponent,
    CategoriaListComponent,
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataBase),
    IMaskModule,
    BrowserAnimationsModule,
    CalendarModule

  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
