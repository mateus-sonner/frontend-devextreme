import { Component } from '@angular/core';
import { DxTextBoxComponent } from 'devextreme-angular';
import { Container } from '../../shared/components/container/container';
import { Cabecalho } from '../../shared/components/cabecalho/cabecalho';
import { FormsModule } from '@angular/forms';

import agenda from '../../agenda.json';

interface ContatoInterface {
  id: number;
  nome: string;
  telefone: string;
}

@Component({
  selector: 'app-agenda',
  imports: [Container, Cabecalho, DxTextBoxComponent, FormsModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export class Agenda {
  filtroPorTexto: string = '';
}
