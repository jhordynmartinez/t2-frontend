import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mat-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './mat-confirm-dialog-component.html',
  styleUrls: ['./mat-confirm-dialog-component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>
    ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}