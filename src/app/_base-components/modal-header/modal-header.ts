import { Component, Input, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-header',
  standalone: false,
  templateUrl: './modal-header.html',
  styleUrl: './modal-header.scss',
})
export class ModalHeader {
  @Input() modalTitle: string = '';
  @Input() closeButton: boolean = true;

  isAdd = signal<boolean>(false);
  isUpdate = signal<boolean>(false);

  constructor(private diolagRef: MatDialogRef<any>) {}

  closeModal() {
    this.diolagRef.close();
  }
}
