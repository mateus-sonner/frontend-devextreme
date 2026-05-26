import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DxSelectBoxModule } from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seletor-estado',
  imports: [DxSelectBoxModule],
  templateUrl: './seletor-estado.html',
  styleUrl: './seletor-estado.scss',
})

/*Oninit permite executar assim q a aplicacao for iniciada*/
export class SeletorEstado implements OnInit {
  /*protocolo para requisicoes do tipo http*/
  private http = inject(HttpClient);

  /*array responsavel por armazenar os estados*/
  estados: any[] = [];

  @Output() estadoSelecionadoChange = new EventEmitter<number>();

  /*variavel para guardar qual estado foi selecionado*/
  estadoSelecionado: number | null = null;

  /*chama o metodo buscarEstados assim que a aplicacao for iniciada*/
  ngOnInit(): void {
    this.buscarEstados();
  }

  /*metodo responsavel por buscar os estados atraves da API do IBGE*/
  buscarEstados(): void {
    /*faz uma requisicao http para obter os estados*/
    this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').subscribe({
      /*quando a resposta chega ordena os estados pelo nome comparando atraves do localeCompare*/
      next: (dados) => {
        this.estados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
      },
    });
  }
}
