import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastarHeroisComponent } from './cadastar-herois/cadastar-herois.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ListarHeroisComponent } from './listar-herois/listar-herois.component';
import { AppRoutingModule } from './app-routing.module';
import { EditarHeroiComponent } from './editar-heroi/editar-heroi.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CadastarHeroisComponent,
    ListarHeroisComponent,
    EditarHeroiComponent
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
