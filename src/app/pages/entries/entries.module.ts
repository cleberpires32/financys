import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';

import { CalendarModule } from "primeng/calendar";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    CalendarModule
  ]
})
export class EntriesModule { }
