import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private sessionId: string;

  constructor(private apiService: ApiService) {
    this.sessionId = this.getOrCreateSessionId();
    this.loadCart();
  }

  private getOrCreateSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private loadCart(): void {
    this.apiService.getCart(this.sessionId).subscribe({
      next: (items) => this.cartItemsSubject.next(items),
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  addToCart(productId: number, quantity: number = 1): void {
    this.apiService.addToCart(productId, quantity, this.sessionId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert(err.error || 'Failed to add item to cart');
      }
    });
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    this.apiService.updateCartItem(id, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error updating cart:', err)
    });
  }

  removeFromCart(id: number): void {
    this.apiService.removeFromCart(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error removing from cart:', err)
    });
  }

  clearCart(): void {
    this.apiService.clearCart(this.sessionId).subscribe({
      next: () => this.cartItemsSubject.next([]),
      error: (err) => console.error('Error clearing cart:', err)
    });
  }

  getSessionId(): string {
    return this.sessionId;
  }
}
