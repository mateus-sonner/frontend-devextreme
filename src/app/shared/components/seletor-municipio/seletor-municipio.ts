import { Component, Input } from '@angular/core';
import { DxSelectBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-seletor-municipio',
  imports: [DxSelectBoxComponent],
  templateUrl: './seletor-municipio.html',
  styleUrl: './seletor-municipio.scss',
})
export class SeletorMunicipio {

  @Input() estadoSelecionado: string = null;
}
