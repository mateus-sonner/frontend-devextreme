import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalidadeService {
  /*metodo responsavel por buscar os estados atraves da API do IBGE*/
  private http = inject(HttpClient);

  /*realiza a requisicao http para a busca dos estados*/
  buscarEstados(): Observable<any[]> {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }
}
