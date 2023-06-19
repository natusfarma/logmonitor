import { Injectable } from '@angular/core';
import { Arquivo } from '../modals/arquivo';
import { Erro } from '../modals/erro';
import { HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  private readonly apiUrl = '/api'
  constructor(private http:HttpClient) { }

  getArquivos(dias:number,erro:string[]):Observable<Arquivo[]>{
   
    return this.http.post<Arquivo[]>(`${this.apiUrl}/arquivos`,{dias,erro});
  }

  getArquivoPeloNome(nomeArquivo:string):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/arquivo/${nomeArquivo}`)
  }
  
  getOpcoes(){
    return this.http.get<string[]>(`${this.apiUrl}/opcoes`)
  }
}
