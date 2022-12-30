import { InMemoryDbService } from "angular-in-memory-web-api";
import { Categoria } from "./pages/shared/categoria.model";
import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDataBase implements InMemoryDbService {

  createDb() {
    const categorias: Categoria[] = [
      {id:1, nome:'Moradia', descricao: 'Pagamentos de Contas de Casa'},
      {id:2, nome:'Saúde', descricao: 'Plano de Saúde e Remédios'},
      {id:3, nome:'Lazer', descricao: 'Recebimento de Salário'},
      {id:4, nome:'Salário', descricao: 'Pagamentos de Contas de Casa'},
      {id:5, nome:'Freelas', descricao: 'Trabalho com freelas'}
    ];

    const entries: Entry [] = [
      { id: 1, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], paid: false , date: "14/10/2018", amount: "15,00", type: "expense", descricao: "proteina de carboidrato" },
      { id: 3, nome: 'Salário na Empresa X', categoriaId: categorias[3].id, categoria: categorias[3], paid: true, date: "15/10/2018", amount: "4405,49", type: "revenue" },
      { id: 4, nome: 'Aluguel de Filme', categoriaId: categorias[2].id, categoria: categorias[2], paid: true, date: "16/10/2018", amount: "15,00", type: "expense" },
      { id: 5, nome: 'Suplementos', categoriaId: categorias[1].id, categoria: categorias[1], paid: false, date: "17/10/2018", amount: "30,00", type: "expense" },
      { id: 6, nome: 'Video Game da Filha', categoriaId: categorias[2].id, categoria: categorias[2], paid: false, date: "17/10/2018", amount: "15,00", type: "expense" },
      { id: 7, nome: 'Uber', categoriaId: categorias[1].id, categoria: categorias[1], paid: false, date: "17/10/2018", amount: "30,00", type: "expense" },
    ]

    return { categorias, entries }
  }

}
