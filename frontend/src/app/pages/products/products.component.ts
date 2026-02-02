import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styles: [`
    .products-page {
      padding: 40px 0;
    }

    .page-title {
      font-size: 42px;
      font-weight: 700;
      margin-bottom: 32px;
      color: var(--text-dark);
    }

    .filters {
      display: flex;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 20px;
      border: 2px solid var(--border-color);
      background: white;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .filter-btn:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .filter-btn.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s;
    }

    .product-card:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-4px);
    }

    .product-image {
      position: relative;
      width: 100%;
      height: 280px;
      overflow: hidden;
      background: var(--bg-light);
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .stock-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.9);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .stock-badge.low-stock {
      background: rgba(239, 68, 68, 0.9);
      color: white;
    }

    .product-info {
      padding: 24px;
    }

    .product-category {
      font-size: 12px;
      color: var(--primary-color);
      font-weight: 600;
      text-transform: uppercase;
    }

    .product-name {
      font-size: 22px;
      font-weight: 600;
      margin: 8px 0 4px;
      color: var(--text-dark);
    }

    .product-brand {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 8px;
    }

    .product-description {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .product-price {
      font-size: 28px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .product-actions {
      display: flex;
      gap: 8px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    const category = this.selectedCategory || undefined;
    this.apiService.getProducts(category).subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product.id, 1);
      alert(`${product.name} added to cart!`);
    }
  }
}
