import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>HealthStore</h3>
            <p>Your trusted source for premium health products and supplements.</p>
          </div>
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Contact</h4>
            <p>Email: support&#64;healthstore.com</p>
            <p>Phone: 1-800-HEALTH</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 HealthStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--text-dark);
      color: white;
      padding: 40px 0 20px;
      margin-top: 60px;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      margin-bottom: 40px;
    }

    .footer-section h3,
    .footer-section h4 {
      margin-bottom: 16px;
      color: var(--primary-light);
    }

    .footer-section ul {
      list-style: none;
    }

    .footer-section ul li {
      margin-bottom: 8px;
    }

    .footer-section a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.2s;
    }

    .footer-section a:hover {
      color: var(--primary-light);
    }

    .footer-bottom {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
    }
  `]
})
export class FooterComponent {}
