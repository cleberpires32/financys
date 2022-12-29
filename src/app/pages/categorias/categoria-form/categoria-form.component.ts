
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from "@angular/router"
import { Categoria } from '../../shared/categoria.model';
import { CategoriaService } from '../../shared/categoria.service';
import { switchMap } from 'rxjs';
import * as toastr from 'toastr';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = ''; // vai definir qual formulario estou trabalhando editandaou ou new
  categoriaForm: FormGroup | any; //Criação do formulario
  pageTitle: string = ''; // Titulo da pagina do formulario que será alterado de acordo com o pedido
  serverErrorMessages: string[] = [];// conjunto de mensagens.
  submitTingForm: boolean = false; //desabilita o botoao para não deixar requisitando formulario sem validações
  categoria: Categoria = new Categoria();


  constructor(
    private categoriaservice: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setCurrentAction();//define a formulario esta atuando em questão
    this.buildCategoriaForm();//controi/defini o formulario de categoria
    this.loadCategoria();//carrega a categoria vindo do base e seta no objeto

  }

  submitForm() {
    this.submitTingForm = true;
    if (this.currentAction == 'new') {
      this.createCategoria();
    } else {
      this.updateCategoria();
    }
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.setPageTitle();

  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit'
    }
  }

  private buildCategoriaForm() {

    this.categoriaForm = this.formbuilder.group({
      id: null,
      name: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null]
    })
  }

  private loadCategoria() {
    if (this.currentAction == 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.categoriaservice.getById(params.get('id') as any))).subscribe((categoria) => {
          this.categoria = categoria;
          this.categoriaForm?.patchValue(categoria)//binds categoria loaded categoria data to categoriaform
        },
          (error) => alert('Ocorreu um erro no servidor tente mais tarde.')
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'
    else {
      const categoriaNome = this.categoria.nome || '';
      this.pageTitle = 'Editando Categoria: ' + categoriaNome ;
    }
  }

   createCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaservice.create(categoria).subscribe((categoria) => this.actionsForSuccess(categoria),
      error => this.actionsForError(error));
  }

  private updateCategoria() {
    const categoria: Categoria = Object.assign(new Categoria(), this.categoriaForm.value);
    this.categoriaservice.update(categoria).subscribe((categoria) => this.actionsForSuccess(categoria),
    error => this.actionsForError(error));
   }

  private actionsForSuccess(categoria: Categoria){
    toastr.success('Solicitação processada com sucesso!');
    //redirect/reload component page - o skiplocation salta da path categorias direto para edit nçao guarda sessão no browser 'categorias', {skipLocationChange: true}
    //nome dosite.com/categorias/new
        //nome dosite.com/categorias
            //nome dosite.com/categorias/:id/edit
    this.router.navigateByUrl('categorias', {skipLocationChange: true}).then(
      () => this.router.navigate(['categorias', categoria.id, 'edit']))
  }

  private actionsForError(error: any)
  {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!')
    this.submitTingForm = false;
    if(error.status === 4222){
      this.serverErrorMessages = JSON.parse(error._body).erros;
    }else{
      this.serverErrorMessages = ['Falha na comunicação com o servidor. por favor, teste mais tarde.']
    }

  }

}
