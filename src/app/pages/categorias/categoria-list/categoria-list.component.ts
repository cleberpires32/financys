import { CategoriaService } from '../../categoria/shared/categoria.service';
import { Categoria } from '../../categoria/shared/categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit{
  categorias: Categoria[] = [];
  constructor(private categoriaService: CategoriaService){}

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias,
      error => alert('Erro ao carregar a lista')
    )
  }

  delete(categoria: any){
    const musdelete = confirm('Deseja realmente excluir este item?')
    if(musdelete){
      this.categoriaService.delete(categoria.id).subscribe(
        () => this.categorias = this.categorias.filter(element => element != categoria),
        () => alert('Error ao tentar excluir')
      )
    }
  }

}
