import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DxSelectBoxModule, DxTextBoxComponent } from 'devextreme-angular';
import { LocalidadeService } from '../../services/localidade.service';

@Component({
  selector: 'app-seletor-estado',
  imports: [DxSelectBoxModule, DxTextBoxComponent],
  templateUrl: './seletor-estado.html',
  styleUrl: './seletor-estado.scss',
})

/*Oninit permite executar assim q a aplicacao for iniciada*/
export class SeletorEstado implements OnInit {
  /*injeta o localidadeService no componente*/
  constructor(private localidadeService: LocalidadeService) {}

  /*array responsavel por armazenar os estados*/
  estados: any[] = [];

  estadoSelecionado: string = null;

  @Output() estadoChange = new EventEmitter<string>();

  /*chama o metodo buscarEstados assim que a aplicacao for iniciada*/
  ngOnInit(): void {
    this.buscarEstados();
  }

  /*metodo responsavel por chamar a busca dos estados*/
  buscarEstados(): void {
    /*chama o service para a busca dos estados onde o subscribe e responsavel por receber a resposta da requisicao http*/
    this.localidadeService.buscarEstados().subscribe({
      /*quando a requisicao e retornada (next) a variavel (dados) contem a lista de estados*/
      next: (dados) => {
        /*ordena os estados alfabeticamente pelo nome atraves do (sort) onde os estados sao comparados atraves do (localeCompare)*/
        this.estados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
      },
    });
  }

  /*ao selecionar o estado envia os dados do mesmo para o componentes pai indicando a selecao do estado*/
  selecionarEstado(e: any): void {
    this.estadoChange.emit(e.value);
  }
}
