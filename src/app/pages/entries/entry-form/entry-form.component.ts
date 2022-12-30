
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from "@angular/router"
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { switchMap } from 'rxjs';
import * as toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = ''; // vai definir qual formulario estou trabalhando editandaou ou new
  entryForm: FormGroup | any; //Criação do formulario
  pageTitle: string = ''; // Titulo da pagina do formulario que será alterado de acordo com o pedido
  serverErrorMessages: string[] | any;// conjunto de mensagens.
  submitTingForm: boolean = false; //desabilita o botoao para não deixar requisitando formulario sem validações
  entry: Entry = new Entry();


  constructor(
    private entryservice: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setCurrentAction();//define a formulario esta atuando em questão
    this.buildEntryForm();//controi/defini o formulario de entry
    this.loadEntry();//carrega a entry vindo do base e seta no objeto

  }

  submitForm() {
    this.submitTingForm = true;
    if (this.currentAction == 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
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

  private buildEntryForm() {
    this.entryForm = this.formbuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null, [Validators.required]],
      categoriaId: [null, [Validators.required]]
    });
  }

  private loadEntry() {
    if (this.currentAction == 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.entryservice.getById(params.get('id') as any))).subscribe((entry) => {

          this.entry = entry;
          this.entryForm?.patchValue(entry)//binds entry loaded entry data to entryform
          console.log(this.entryForm)
        },
          (error) => alert('Ocorreu um erro no servidor tente mais tarde.')
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new')
      this.pageTitle = 'Cadastro de Novo Lançamento'
    else {
      const entryNome = this.entry.nome || '';
      this.pageTitle = 'Editando Lançamento: ' + entryNome ;
    }
  }

   createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryservice.create(entry).subscribe((entry) => this.actionsForSuccess(entry),
      error => this.actionsForError(error));
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryservice.update(entry).subscribe((entry) => this.actionsForSuccess(entry),
    error => this.actionsForError(error));
   }

  private actionsForSuccess(entry: Entry){
    toastr.success('Solicitação processada com sucesso!');
    //redirect/reload component page - o skiplocation salta da path entrys direto para edit nçao guarda sessão no browser 'entrys', {skipLocationChange: true}
    //nome dosite.com/entrys/new
        //nome dosite.com/entrys
            //nome dosite.com/entrys/:id/edit
    this.router.navigateByUrl('entrys', {skipLocationChange: true}).then(
      () => this.router.navigate(['entrys', entry.id, 'edit']))
  }

  private actionsForError(error: any)
  {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!')
    this.submitTingForm = false;
    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).erros;
    }else{
      this.serverErrorMessages = ['Falha na comunicação com o servidor. por favor, tente mais tarde.']
    }

  }

}