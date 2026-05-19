import { Component } from '@angular/core';
import {
  DxButtonComponent,
  DxListModule,
  DxPopupComponent,
  DxTextBoxComponent,
  DxValidationGroupComponent,
  DxValidatorComponent,
} from 'devextreme-angular';
import { Container } from '../../shared/components/container/container';
import { Cabecalho } from '../../shared/components/cabecalho/cabecalho';
import { FormsModule } from '@angular/forms';
import { AgendaService } from '../../shared/services/agenda.service';
import { DxiValidationRuleComponent } from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-agenda',
  imports: [
    Container,
    Cabecalho,
    DxListModule,
    FormsModule,
    DxButtonComponent,
    DxPopupComponent,
    DxTextBoxComponent,
    DxValidatorComponent,
    DxiValidationRuleComponent,
    DxValidationGroupComponent,
  ],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export class Agenda {
  /*variavel que ira receber os contatos*/
  contatos: any = [];

  /*injeta o service no componente*/
  constructor(private agendaService: AgendaService) {
    /*this.agendaService.obterContatos() faz requisição HTTP.*/
    /*.subscribe((contatos) quando os dadods chegam da API, contatos recebe as informacoes*/
    this.agendaService.obterContatos().subscribe((contatos) => {
      /*agrupa os contatos de acordo com a letra inicial*/
      this.contatos = this.agendaService.obterDadosAgrupados(contatos);
    });
  }

  /*controla se a popup esta aberta*/
  popupVisivel = false;

  /*abre a popup chamada pelo html (onClick)="abrirPopup()*/
  abrirPopup() {
    this.popupVisivel = true;
  }

  /*objeto responsavel por receber os dados a serem cadastrados*/
  novoContato = {
    nome: '',
    telefone: '',
  };

  salvarContato(e: any) {
    this.agendaService.salvarContato(e, this.novoContato)?.subscribe(() => {
      this.popupVisivel = false;
      this.agendaService.obterContatos().subscribe((contatos) => {
        this.contatos = this.agendaService.obterDadosAgrupados(contatos);
      });
    });
  }
}
