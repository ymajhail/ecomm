import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 20px;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .featured-products {
      padding: 80px 0;
    }

    .section-title {
      font-size: 36px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 48px;
      color: var(--text-dark);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: var(--bg-light);
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      padding: 20px;
    }

    .product-category {
      font-size: 12px;
      color: var(--primary-color);
      font-weight: 600;
      text-transform: uppercase;
    }

    .product-name {
      font-size: 20px;
      font-weight: 600;
      margin: 8px 0 4px;
      color: var(--text-dark);
    }

    .product-brand {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 16px;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .features {
      background: white;
      padding: 60px 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
    }

    .feature {
      text-align: center;
    }

    .feature-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .feature h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-dark);
    }

    .feature p {
      color: var(--text-light);
    }
  `]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error loading products:', err)
    });
  }
}
