import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataBase implements InMemoryDbService {

  createDb() {
    const categorias = [
      {id:1, nome:'Moradia', descricao: 'Pagamentos de Contas de Casa'},
      {id:2, nome:'Saúde', descricao: 'Plano de Saúde e Remédios'},
      {id:3, nome:'Lazer', descricao: 'Recebimento de Salário'},
      {id:4, nome:'Salário', descricao: 'Pagamentos de Contas de Casa'},
      {id:5, nome:'Freelas', descricao: 'Trabalho com freelas'}
    ];
    return { categorias }
  }
}
