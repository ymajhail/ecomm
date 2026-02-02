import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styles: [`
    .product-detail-page {
      padding: 40px 0;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 24px;
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: var(--primary-dark);
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: var(--shadow-md);
    }

    .product-image-section img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      border-radius: 12px;
    }

    .product-category {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 600;
      text-transform: uppercase;
    }

    .product-name {
      font-size: 36px;
      font-weight: 700;
      margin: 12px 0 8px;
      color: var(--text-dark);
    }

    .product-brand {
      font-size: 18px;
      color: var(--text-light);
      margin-bottom: 24px;
    }

    .product-price-section {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
    }

    .price {
      font-size: 42px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .stock {
      padding: 8px 16px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--success-color);
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
    }

    .stock.low-stock {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error-color);
    }

    .product-description {
      font-size: 16px;
      line-height: 1.8;
      color: var(--text-light);
      margin-bottom: 32px;
    }

    .product-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      align-items: center;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 16px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      padding: 8px 16px;
    }

    .quantity-selector button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: var(--text-dark);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .quantity-selector button:hover:not(:disabled) {
      background: var(--bg-light);
    }

    .quantity-selector button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .quantity-selector span {
      font-size: 18px;
      font-weight: 600;
      min-width: 40px;
      text-align: center;
    }

    .add-to-cart-btn {
      flex: 1;
      padding: 16px 32px;
      font-size: 18px;
    }

    .product-features {
      display: flex;
      gap: 24px;
      padding-top: 32px;
      border-top: 1px solid var(--border-color);
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--text-light);
    }

    .feature-icon {
      font-size: 20px;
    }

    @media (max-width: 968px) {
      .product-detail {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.quantity = Math.min(1, product.stock);
        },
        error: (err) => console.error('Error loading product:', err)
      });
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product.id, this.quantity);
      alert(`${this.quantity} x ${this.product.name} added to cart!`);
    }
  }
}
