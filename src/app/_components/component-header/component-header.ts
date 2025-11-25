import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-header',
  standalone: false,
  templateUrl: './component-header.html',
  styleUrl: './component-header.scss',
})
export class ComponentHeader {
  @Input() title: string = '';
  @Input() titleClass: string = '';
}
