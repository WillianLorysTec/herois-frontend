import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Heroi } from 'src/models/heroi';
import { HeroiViewModel } from 'src/models/heroiViewModel';
import { Poder } from 'src/models/poder';
import { PoderViewModel } from 'src/models/poderViewModel';
import { Service } from 'src/service/service';

@Component({
  selector: 'app-editar-heroi',
  templateUrl: './editar-heroi.component.html',
  styleUrls: ['./editar-heroi.component.css']
})
export class EditarHeroiComponent implements OnInit {
  dataNascimento!: string
  selectedItems: any
  poderesVinculados: PoderViewModel[] = [];
  selectedOption: string = '';
  nome: string = '';
  nomeHeroi: string = ''
  altura: number | any;
  peso: number | any;
  dropdownList: any;
  dropdownSettings: any;
  form: FormGroup | any;
  idHeroi: number | any;

  constructor(private formBuilder: FormBuilder,
    private _service: Service,
    private router: Router,
    private routeId: ActivatedRoute,
    private datePipe: DatePipe,
    private toastr: ToastrService) { }

  async ngOnInit() {
    this.initForm();
    this.routeId.params.subscribe((objeto: any) => {
      this.idHeroi = objeto.idHeroi;
    });

    const heroi = await this.ListarHeroiPorId(this.idHeroi).toPromise();

    if (heroi) {
      this.nome = heroi.nome;
      this.nomeHeroi = heroi.nomeHeroi;
      this.altura = heroi.altura;
      this.peso = heroi.peso;
      this.dataNascimento = this.datePipe.transform(heroi.dataNascimento, 'yyyy-MM-dd') ?? "";
      this.poderesVinculados = heroi.superPoderes;

      this.dropdownList = await this.getData().toPromise();
      this.selectedItems = this.poderesVinculados.slice();
    } else {
    }


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'superpoder',
      selectAllText: 'Selecione Todos',
      unSelectAllText: 'UnSelect All'
    };
  }
  ListarHeroiPorId(idHeroi: number): Observable<HeroiViewModel> {
    return this._service.ListarHeroiPorId(idHeroi);
  }

  initForm() {
    this.form = this.formBuilder.group({
      grocery: ['', [Validators.required]]
    })
  }

  Voltar() {
    this.router.navigate(['']);

  }
  async AtualizarHeroi() {

    const CamposPreenchidos = this.CamposPreenchidos();
    if (CamposPreenchidos) {
      let IdPoderes: number[] = [];
      if (this.form.value.grocery) {
        IdPoderes = this.form.value.grocery.map((item: any) => item.id);
      }
      const heroi: Heroi = {
        id: this.idHeroi,
        nome: this.nome,
        nomeHeroi: this.nomeHeroi,
        dataNascimento: this.dataNascimento,
        peso: this.peso,
        altura: this.altura,
        poderesAdicionados: IdPoderes
      };

      this._service.AtualizarHeroi(heroi).subscribe((response) => {
        if (response.status === 201) {
          this.toastr.success('Herói atualizado com sucesso', 'Sucesso', {
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
