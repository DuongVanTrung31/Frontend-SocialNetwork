import { MatConfirmDialogComponent } from '../homepage/mat-confirm-dialog/mat-confirm-dialog.component';
import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg : string){
    return this.dialog.open(MatConfirmDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "150px" },
      data :{
        message : msg
      }
    });
  }
}
