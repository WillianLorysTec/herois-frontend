
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Heroi } from 'src/models/heroi';
import { Poder } from 'src/models/poder';
import { Service } from 'src/service/service';

@Component({
  selector: 'app-cadastar-herois',
  templateUrl: './cadastar-herois.component.html',
  styleUrls: ['./cadastar-herois.component.css'],

})
export class CadastarHeroisComponent {

  dataNascimento: string = ''
  selectedOption: string = '';
  nome: string = '';
  nomeHeroi: string = ''
  altura: number | any;
  peso: number | any;
  dropdownList: any;
  dropdownSettings: any;
  form: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private _service: Service, private router: Router,
    private toastr: ToastrService) { }

  async ngOnInit() {
    await this.initForm();
    this.dropdownList = await this.getData().toPromise();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'superpoder',
      selectAllText: 'Selecione Todos',
      unSelectAllText: 'UnSelect All'
    };
  }

  initForm() {
    this.form = this.formBuilder.group({
      grocery: ['', [Validators.required]]
    })
  }

  ListarHerois() {
    this.router.navigate(['/listar-herois']);

  }
  async CriarHeroi() {
    
    const CamposPreenchidos = this.CamposPreenchidos();
    if (CamposPreenchidos) {
      let IdPoderes: number[] = [];
      if(this.form.value.grocery){
        IdPoderes = this.form.value.grocery.map((item: any) => item.id);
      }
      const heroi: Heroi = {
        nome: this.nome,
        nomeHeroi: this.nomeHeroi,
        dataNascimento: this.dataNascimento,
        peso: this.peso,
        altura: this.altura,
        poderesAdicionados: IdPoderes
      };


      this._service.CriarHeroi(heroi).subscribe((response) => {
        if (response.status === 201) {
          this.toastr.success('Herói criado com sucesso', 'Sucesso', {
            timeOut: 2000,
          });
          setTimeout(() => {
            this.router.navigate(['/listar-herois']);
          }, 2000);
        }
        else {
          this.toastr.error(`Erro inesperado: Status ${response.status}`);
        }
      },
        (error) => {
          if (error.status === 400) {
            this.toastr.error(error.error[0].message);
          } else if (error.status === 500) {
            this.toastr.error('Temos um erro no servidor!', 'Erro');
          }
          else {
            this.toastr.error(`Erro inesperado: Status ${error.status}`);
          }
        }

      );
    }
    else {
      return;
    }


  }

  getData(): Observable<Poder[]> {
    return this._service.ListarPoderes();
  }

  // o retorno dos campos preenchidos é indivual porque meu tempo esta acabando kkk

  CamposPreenchidos(): boolean {
    switch (true) {
      case !this.nome:
        this.toastr.error(`O nome está vazio`)
        return false;
      case !this.nomeHeroi:
        this.toastr.error(`Nome do herói está vazio.`)
        return false;
      case this.peso === null || this.peso === undefined:
        this.toastr.error(`Peso está vazio.`)
        return false
      case this.altura === null || this.altura === undefined:
        this.toastr.error(`Altura está vazia.`)
        return false
      case !this.dataNascimento:
        this.toastr.error(`Data de nascimento está vazia.`)
        return false

      default:
        return true;
    }
  }
}




