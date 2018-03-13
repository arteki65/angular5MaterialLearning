import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(message, action, duration = 3000) {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}
