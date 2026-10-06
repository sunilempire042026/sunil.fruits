import apiClient from './apiClient';
import {
  ApiResponse,
  PagedResponse,
  OrderDto,
  CreateOrderRequest,
} from '../types/api';

/**
 * Order Service - .NET Web API Integration
 * 
 * Endpoints match standard .NET Controller patterns:
 * GET    /api/orders
 * GET    /api/orders/{id}
 * POST   /api/orders
 * PUT    /api/orders/{id}/status
 */
export const orderService = {
  /**
   * Get user's orders
   * Maps to: GET /api/orders?page={page}&pageSize={pageSize}
   */
  async getMyOrders(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<PagedResponse<OrderDto>> {
    const response = await apiClient.get<PagedResponse<OrderDto>>('/orders', {
      params,
    });
    return response.data;
  },

  /**
   * Get order by ID
   * Maps to: GET /api/orders/{id}
   */
  async getById(id: string): Promise<OrderDto> {
    const response = await apiClient.get<OrderDto>(`/orders/${id}`);
    return response.data;
  },

  /**
   * Create a new order
   * Maps to: POST /api/orders
   */
  async create(order: CreateOrderRequest): Promise<OrderDto> {
    const response = await apiClient.post<OrderDto>('/orders', order);
    return response.data;
  },

  /**
   * Cancel an order
   * Maps to: PUT /api/orders/{id}/cancel
   */
  async cancel(id: string, reason?: string): Promise<ApiResponse<null>> {
    const response = await apiClient.put<ApiResponse<null>>(`/orders/${id}/cancel`, {
      reason,
    });
    return response.data;
  },

  /**
   * Get order tracking information
   * Maps to: GET /api/orders/{id}/tracking
   */
  async getTracking(id: string): Promise<any> {
    const response = await apiClient.get(`/orders/${id}/tracking`);
    return response.data;
  },
};
