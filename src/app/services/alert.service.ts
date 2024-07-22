import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface Alert {
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert>({ message: '', visible: false });
  alert$ = this.alertSubject.asObservable();
  private autoHideDuration = 2000; 

  show(message: string, autoHide = true) {
    this.alertSubject.next({ message, visible: true });

    if (autoHide) {
      timer(this.autoHideDuration).pipe(
        switchMap(() => this.alert$)
      ).subscribe(() => this.hide());
    }
  }

  hide() {
    this.alertSubject.next({ message: '', visible: false });
  }

  getAlert() {
    return this.alert$;
  }
}
