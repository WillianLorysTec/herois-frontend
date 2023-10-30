import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IndividualConfig, Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Heroi } from 'src/models/heroi';
import { Service } from 'src/service/service';

@Component({
  selector: 'app-listar-herois',
  templateUrl: './listar-herois.component.html',
  styleUrls: ['./listar-herois.component.css']
})
export class ListarHeroisComponent {

  constructor(private service: Service, private routes: Router, private toastr: ToastrService) { }
  dados: Heroi[] | undefined;

  async ngOnInit() {
    this.dados = await this.getData().toPromise();
  }

  getData(): Observable<Heroi[]> {
    return this.service.ListarHerois();
  }
  EditarHeroi(idHeroi: any) {
    this.routes.navigate(['/editar-heroi', idHeroi])
  }

  ExcluirHeroi(idHeroi: any) {
    this.service.RemoverHeroiPorId(idHeroi).subscribe((response) => {
      console.log(response)
      if (response.status === 201) {
        this.toastr.success('Heroi deletado', 'Sucesso', {
          timeOut: 2000,
        });

        window.location.reload();

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
    )

  }

}

