import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  templateUrl: './snackbar-error.component.html',
  styleUrls: ['./snackbar-error.component.scss']
})
export class SnackbarErrorComponent  {
  snackBarRef = inject(MatSnackBarRef);
   
}
