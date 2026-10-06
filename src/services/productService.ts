import apiClient from './apiClient';
import {
  ApiResponse,
  PagedResponse,
  ProductDto,
  CreateProductRequest,
  UpdateProductRequest,
  CategoryDto,
} from '../types/api';

/**
 * Product Service - .NET Web API Integration
 * 
 * Endpoints match standard .NET Controller patterns:
 * GET    /api/products
 * GET    /api/products/{id}
 * POST   /api/products
 * PUT    /api/products/{id}
 * DELETE /api/products/{id}
 */
export const productService = {
  /**
   * Get all products with optional filtering
   * Maps to: GET /api/products?category={category}&search={search}
   */
  async getAll(params?: {
    category?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PagedResponse<ProductDto>> {
    const response = await apiClient.get<PagedResponse<ProductDto>>('/products', {
      params,
    });
    return response.data;
  },

  /**
   * Get product by ID
   * Maps to: GET /api/products/{id}
   */
  async getById(id: number): Promise<ProductDto> {
    const response = await apiClient.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  /**
   * Create a new product (Admin only)
   * Maps to: POST /api/products
   */
  async create(product: CreateProductRequest): Promise<ProductDto> {
    const response = await apiClient.post<ProductDto>('/products', product);
    return response.data;
  },

  /**
   * Update an existing product (Admin only)
   * Maps to: PUT /api/products/{id}
   */
  async update(id: number, product: UpdateProductRequest): Promise<ProductDto> {
    const response = await apiClient.put<ProductDto>(`/products/${id}`, product);
    return response.data;
  },

  /**
   * Delete a product (Admin only)
   * Maps to: DELETE /api/products/{id}
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/products/${id}`);
    return response.data;
  },

  /**
   * Get all categories
   * Maps to: GET /api/categories
   */
  async getCategories(): Promise<CategoryDto[]> {
    const response = await apiClient.get<CategoryDto[]>('/categories');
    return response.data;
  },

  /**
   * Search products
   * Maps to: GET /api/products/search?query={query}
   */
  async search(query: string): Promise<ProductDto[]> {
    const response = await apiClient.get<ProductDto[]>('/products/search', {
      params: { query },
    });
    return response.data;
  },
};
