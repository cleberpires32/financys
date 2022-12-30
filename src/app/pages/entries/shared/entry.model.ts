import { Categoria } from './../../shared/categoria.model';
export class Entry {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoriaId?: number,
    public categoria?: Categoria
  ){}

  static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  }
}
