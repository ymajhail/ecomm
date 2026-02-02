import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="order-success-page">
      <div class="container">
        <div class="success-content">
          <div class="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p class="success-message">Thank you for your purchase. Your order has been received and is being processed.</p>
          <div class="order-info" *ngIf="orderNumber">
            <p><strong>Order Number:</strong> {{ orderNumber }}</p>
          </div>
          <div class="actions">
            <a routerLink="/products" class="btn btn-primary">Continue Shopping</a>
            <a routerLink="/" class="btn btn-outline">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-success-page {
      padding: 80px 0;
    }

    .success-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      background: white;
      padding: 60px 40px;
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }

    .success-icon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--success-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
      margin: 0 auto 32px;
    }

    h1 {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--text-dark);
    }

    .success-message {
      font-size: 18px;
      color: var(--text-light);
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .order-info {
      background: var(--bg-light);
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 32px;
    }

    .order-info p {
      font-size: 18px;
      color: var(--text-dark);
    }

    .actions {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
  `]
})
export class OrderSuccessComponent implements OnInit {
  orderNumber: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Get order number from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.orderNumber = (navigation.extras.state as { orderNumber?: string })['orderNumber'] || null;
    }
    
    // Fallback: try to get from browser history state
    if (!this.orderNumber && window.history.state) {
      this.orderNumber = window.history.state['orderNumber'] || null;
    }
  }
}
