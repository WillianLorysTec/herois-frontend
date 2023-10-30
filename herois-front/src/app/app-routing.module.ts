import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastarHeroisComponent } from './cadastar-herois/cadastar-herois.component';
import { ListarHeroisComponent } from './listar-herois/listar-herois.component';
import { EditarHeroiComponent } from './editar-heroi/editar-heroi.component';


const routes: Routes = [
  { path: '', component: CadastarHeroisComponent },
  { path: 'listar-herois', component: ListarHeroisComponent },
  { path: 'editar-heroi/:idHeroi', component: EditarHeroiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
