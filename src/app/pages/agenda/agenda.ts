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
  contatos: any = [];

  constructor(private agendaService: AgendaService) {
    this.contatos = agendaService.obterDadosAgrupados();
  }

  popupVisivel = false;

  abrirPopup() {
    this.popupVisivel = true;
  }

  novoContato = {
    nome: '',
    telefone: '',
  };

  salvarContato(e: any) {
    this.agendaService.salvarContato(e, this.novoContato);
  }
}
