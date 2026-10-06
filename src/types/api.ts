// .NET API Response Types
// These types match the standard .NET Web API response patterns

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface ApiErrorResponse {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
  message?: string;
  traceId?: string;
}

export interface PagedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

// Authentication Types (.NET Identity compatible)
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresAt: string;
  user: UserDto;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  emailConfirmed: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Product Types (.NET DTO compatible)
export interface ProductDto {
  id: number;
  name: string;
  origin: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  details: string[];
  imageUrl?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  season: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  origin: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  details: string[];
  imageUrl?: string;
  season: string;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

// Order Types (.NET DTO compatible)
export interface OrderDto {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItemDto[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: AddressDto;
  billingAddress: AddressDto;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
  shippingAddress: AddressDto;
  billingAddress?: AddressDto;
  paymentMethod: string;
  notes?: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface AddressDto {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
  Refunded = 'Refunded'
}

// Category Types
export interface CategoryDto {
  id: string;
  name: string;
  description?: string;
  productCount: number;
}
