import { Component } from '@angular/core';
import { SeletorEstado } from '../../shared/components/seletor-estado/seletor-estado';
import { Container } from '../../shared/components/container/container';
import { SeletorMunicipio } from '../../shared/components/seletor-municipio/seletor-municipio';

@Component({
  selector: 'app-municipio',
  imports: [SeletorEstado, Container, SeletorMunicipio],
  templateUrl: './localidade.html',
  styleUrl: './localidade.scss',
})
export class Localidade {

  /*variavel responsavel por armazenar os dados do estado selecionado*/
  estadoSelecionado: string = null;

}
