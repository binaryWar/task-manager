import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service'; // Import your service here

@Component({
    selector: 'app-alert-box',
    template: `
      <div class="alert-box" *ngIf="isVisible">
        <div class="alert-content">
          <p>{{ message }}</p>
          <!-- <span (click)="hide()">X</span> -->
        </div>
      </div>
    `,
    styles: [`
      .alert-box {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #f44336;
        color: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
      }
  
      .alert-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      span {
        background: none;
        font-size : 8px;
        color : #fff;
        font-weight: bold;
        cursor: pointer;
      }
    `]
  })

export class AlertBoxComponent implements OnInit {
  isVisible = false;
  message = '';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe(alert => {
      this.message = alert.message;
      this.isVisible = alert.visible;
    });
  }

  hide() {
    this.isVisible = false;
  }
}
