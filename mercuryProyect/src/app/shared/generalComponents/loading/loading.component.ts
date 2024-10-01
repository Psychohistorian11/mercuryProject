import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="loading-overlay" *ngIf="loading">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .spinner {
      border: 5px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent {
  loading = false;

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }
}
