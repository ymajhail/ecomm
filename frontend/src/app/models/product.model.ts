export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  brand: string;
}

export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface CreateOrder {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  sessionId: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
