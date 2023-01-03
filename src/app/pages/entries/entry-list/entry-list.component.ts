import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route,Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as toastr from 'toastr';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit{
  entries: Entry[] = [];
  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit() {
    this.entryService.getAll().subscribe(
      entries => this.entries = entries.sort((a,b) => Number(a.id) - Number(a.id)),
      error => alert('Erro ao carregar a lista')
    )
  }

  delete(entry: any){
    const musdelete = confirm('Deseja realmente excluir este item?')
    if(musdelete){
      this.entryService.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Error ao tentar excluir')
      )
    }
  }

}
