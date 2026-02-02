import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styles: [`
    .checkout-page {
      padding: 40px 0;
    }

    .page-title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 32px;
      color: var(--text-dark);
    }

    .checkout-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }

    .form-section {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
    }

    .form-section h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--text-dark);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-dark);
    }

    .error {
      display: block;
      color: var(--error-color);
      font-size: 14px;
      margin-top: 4px;
    }

    .submit-btn {
      width: 100%;
      padding: 16px;
      font-size: 18px;
      margin-top: 8px;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .summary-card {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 100px;
    }

    .summary-card h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
      color: var(--text-dark);
    }

    .order-items {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-color);
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .item-info {
      display: flex;
      flex-direction: column;
    }

    .item-name {
      font-weight: 500;
      color: var(--text-dark);
      margin-bottom: 4px;
    }

    .item-quantity {
      font-size: 14px;
      color: var(--text-light);
    }

    .item-price {
      font-weight: 600;
      color: var(--text-dark);
    }

    .summary-totals {
      margin-top: 24px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
    }

    .summary-row.total {
      border-top: 2px solid var(--border-color);
      margin-top: 12px;
      padding-top: 16px;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-dark);
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
      .checkout-content {
        grid-template-columns: 1fr;
      }

      .summary-card {
        position: static;
      }
    }
  `]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  total: number = 0;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.subtotal = this.cartService.getCartTotal();
      this.total = this.subtotal;
    });

    if (this.cartItems.length === 0) {
      this.cartItems = this.cartService.getCartItems();
      this.subtotal = this.cartService.getCartTotal();
      this.total = this.subtotal;
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      this.isSubmitting = true;
      
      const orderData = {
        ...this.checkoutForm.value,
        sessionId: this.cartService.getSessionId()
      };

      this.apiService.createOrder(orderData).subscribe({
        next: (order) => {
          this.cartService.clearCart();
          this.router.navigate(['/order-success'], { 
            state: { orderNumber: order.orderNumber }
          });
        },
        error: (err) => {
          console.error('Error creating order:', err);
          alert(err.error || 'Failed to place order. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
