import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from "src/environment/environment.prod";
import { Heroi } from "src/models/heroi";
import { Observable } from "rxjs";
import { Poder } from "src/models/poder";
import { HeroiViewModel } from "src/models/heroiViewModel";


@Injectable({
    providedIn: 'root'
  })

export class Service {


    constructor(private _http: HttpClient) { }
    baseUrl: string = environment.URL_API + 'heroi';
    baseUrlConsulta: string = environment.URL_API + 'consulta';
  
  ListarHerois(): Observable<Heroi[]>{
   return this._http.get<Heroi[]>(`${this.baseUrl}/ListarHerois`)
  }

  ListarHeroiPorId(idHeroi: number): Observable<HeroiViewModel> {
    return this._http.get<HeroiViewModel>(`${this.baseUrl}/ListarHeroiID?idHeroi=${idHeroi}`);
  }

  CriarHeroi(heroi: Heroi): Observable<HttpResponse<any>> {
    return this._http.post<any>(`${this.baseUrl}/CriarHeroi`, heroi, { observe: 'response' });
  }

  AtualizarHeroi(heroi: Heroi): Observable<HttpResponse<any>> {
    return this._http.put<any>(`${this.baseUrl}/AtualizarHeroi`, heroi, { observe: 'response' });
  }

  RemoverHeroiPorId(idHeroi: number): Observable<HttpResponse<any>>{
    return this._http.delete<any>(`${this.baseUrl}/RemoverHeroi?idHeroi=${idHeroi}`, {observe: 'response'});
  }

  ListarPoderes(): Observable<Poder[]> {
    return this._http.get<Poder[]>(`${this.baseUrl}/ListarPoderes`);
  }
}