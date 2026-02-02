import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">
            <span class="logo-icon">💊</span>
            <span class="logo-text">HealthStore</span>
          </a>
          
          <nav class="nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/products" routerLinkActive="active">Products</a>
          </nav>

          <div class="header-actions">
            <a routerLink="/cart" class="cart-link">
              <span class="cart-icon">🛒</span>
              <span class="cart-count" *ngIf="cartCount > 0">{{ cartCount }}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-dark);
      font-size: 24px;
      font-weight: 700;
    }

    .logo-icon {
      font-size: 32px;
    }

    .nav {
      display: flex;
      gap: 32px;
    }

    .nav a {
      text-decoration: none;
      color: var(--text-light);
      font-weight: 500;
      transition: color 0.2s;
      position: relative;
    }

    .nav a:hover,
    .nav a.active {
      color: var(--primary-color);
    }

    .nav a.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary-color);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .cart-link {
      position: relative;
      text-decoration: none;
      color: var(--text-dark);
      font-size: 24px;
      padding: 8px;
    }

    .cart-count {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }
  `]
})
export class HeaderComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = this.cartService.getCartCount();
    });
  }
}
