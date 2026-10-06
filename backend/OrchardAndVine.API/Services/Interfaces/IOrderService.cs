using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Requests;

namespace OrchardAndVine.API.Services.Interfaces;

public interface IOrderService
{
    Task<PagedResult<OrderDto>> GetOrdersByUserAsync(string userId, int page, int pageSize, string? status);
    Task<OrderDto?> GetOrderByIdAsync(Guid id, string userId);
    Task<OrderDto> CreateOrderAsync(string userId, CreateOrderRequest request);
    Task<bool> CancelOrderAsync(Guid id, string userId, string? reason);
}
