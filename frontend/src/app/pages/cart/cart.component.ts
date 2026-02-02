import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styles: [`
    .cart-page {
      padding: 40px 0;
    }

    .page-title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 32px;
      color: var(--text-dark);
    }

    .cart-items {
      background: white;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      margin-bottom: 32px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 120px 2fr 150px 120px 100px;
      gap: 24px;
      padding: 24px;
      border-bottom: 1px solid var(--border-color);
      align-items: center;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
      background: var(--bg-light);
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-name {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--text-dark);
    }

    .item-brand {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 8px;
    }

    .item-price {
      font-size: 16px;
      color: var(--primary-color);
      font-weight: 600;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 16px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 16px;
    }

    .quantity-controls button {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: var(--text-dark);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .quantity-controls button:hover {
      background: var(--bg-light);
    }

    .quantity-controls span {
      font-size: 16px;
      font-weight: 600;
      min-width: 30px;
      text-align: center;
    }

    .total-price {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .remove-btn {
      background: none;
      border: none;
      color: var(--error-color);
      cursor: pointer;
      font-weight: 500;
      padding: 8px;
    }

    .remove-btn:hover {
      text-decoration: underline;
    }

    .cart-summary {
      display: flex;
      justify-content: flex-end;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      padding: 32px;
      width: 400px;
    }

    .summary-card h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--text-dark);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color);
    }

    .summary-row.total {
      border-bottom: none;
      border-top: 2px solid var(--border-color);
      margin-top: 12px;
      padding-top: 16px;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-dark);
    }

    .checkout-btn {
      width: 100%;
      margin-top: 24px;
      padding: 16px;
      font-size: 18px;
    }

    .continue-shopping {
      display: block;
      text-align: center;
      margin-top: 16px;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }

    .continue-shopping:hover {
      text-decoration: underline;
    }

    .empty-cart {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
    }

    .empty-cart-icon {
      font-size: 80px;
      margin-bottom: 24px;
    }

    .empty-cart h2 {
      font-size: 28px;
      margin-bottom: 12px;
      color: var(--text-dark);
    }

    .empty-cart p {
      font-size: 16px;
      color: var(--text-light);
      margin-bottom: 32px;
    }

    @media (max-width: 968px) {
      .cart-item {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .summary-card {
        width: 100%;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.cartService.getCartTotal();
      this.total = this.subtotal; // Free shipping
    });
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(id, quantity);
    } else {
      this.removeItem(id);
    }
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }
}
