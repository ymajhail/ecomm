import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CartItem, Order, CreateOrder } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(category?: string): Observable<Product[]> {
    const url = category ? `${this.apiUrl}/products?category=${category}` : `${this.apiUrl}/products`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  getCart(sessionId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart/${sessionId}`);
  }

  addToCart(productId: number, quantity: number, sessionId: string): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cart`, {
      productId,
      quantity,
      sessionId
    });
  }

  updateCartItem(id: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cart/${id}`, quantity);
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${id}`);
  }

  clearCart(sessionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/clear/${sessionId}`);
  }

  createOrder(order: CreateOrder): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }
}
