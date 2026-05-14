import { Component } from '@angular/core';
import { DxBoxComponent } from 'devextreme-angular';
import { DxiItemComponent } from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-container',
  imports: [DxBoxComponent, DxiItemComponent],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class Container {}
