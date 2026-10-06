using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OrchardAndVine.API.Data;
using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Entities;
using OrchardAndVine.API.Models.Requests;
using OrchardAndVine.API.Services.Interfaces;
using System.Text.Json;

namespace OrchardAndVine.API.Services;

public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private const decimal FreeShippingThreshold = 150m;
    private const decimal ShippingCost = 12.99m;
    private const decimal TaxRate = 0.08m; // 8% tax

    public OrderService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PagedResult<OrderDto>> GetOrdersByUserAsync(string userId, int page, int pageSize, string? status)
    {
        var query = _context.Orders
            .Include(o => o.Items)
            .Where(o => o.UserId == userId);

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(o => o.Status == status);

        var totalCount = await query.CountAsync();
        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var orderDtos = orders.Select(MapToDto).ToList();

        return new PagedResult<OrderDto>
        {
            Items = orderDtos,
            PageNumber = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        };
    }

    public async Task<OrderDto?> GetOrderByIdAsync(Guid id, string userId)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        return order == null ? null : MapToDto(order);
    }

    public async Task<OrderDto> CreateOrderAsync(string userId, CreateOrderRequest request)
    {
        // Validate products and calculate totals
        var productIds = request.Items.Select(i => i.ProductId).ToList();
        var products = await _context.Products
            .Where(p => productIds.Contains(p.Id))
            .ToListAsync();

        if (products.Count != request.Items.Count)
            throw new InvalidOperationException("One or more products not found");

        var orderItems = new List<OrderItem>();
        decimal subtotal = 0;

        foreach (var item in request.Items)
        {
            var product = products.First(p => p.Id == item.ProductId);
            if (!product.InStock)
                throw new InvalidOperationException($"Product '{product.Name}' is out of stock");

            var totalPrice = product.Price * item.Quantity;
            subtotal += totalPrice;

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                TotalPrice = totalPrice
            });
        }

        // Calculate shipping and tax
        var shippingCost = subtotal >= FreeShippingThreshold ? 0 : ShippingCost;
        var tax = Math.Round(subtotal * TaxRate, 2);
        var total = subtotal + shippingCost + tax;

        // Create order
        var order = new Order
        {
            OrderNumber = GenerateOrderNumber(),
            UserId = userId,
            Subtotal = subtotal,
            ShippingCost = shippingCost,
            Tax = tax,
            Total = total,
            Status = "Pending",
            ShippingAddress = JsonSerializer.Serialize(request.ShippingAddress),
            BillingAddress = request.BillingAddress != null
                ? JsonSerializer.Serialize(request.BillingAddress)
                : null,
            PaymentMethod = request.PaymentMethod,
            Notes = request.Notes,
            Items = orderItems,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return MapToDto(order);
    }

    public async Task<bool> CancelOrderAsync(Guid id, string userId, string? reason)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        if (order == null)
            throw new KeyNotFoundException("Order not found");

        if (order.Status != "Pending" && order.Status != "Processing")
            throw new InvalidOperationException($"Cannot cancel order with status '{order.Status}'");

        order.Status = "Cancelled";
        order.Notes = string.IsNullOrEmpty(order.Notes)
            ? $"Cancelled: {reason}"
            : $"{order.Notes} | Cancelled: {reason}";
        order.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }

    private OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            UserId = order.UserId,
            Items = order.Items.Select(i => new OrderItemDto
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                TotalPrice = i.TotalPrice
            }).ToList(),
            Subtotal = order.Subtotal,
            ShippingCost = order.ShippingCost,
            Tax = order.Tax,
            Total = order.Total,
            Status = order.Status,
            ShippingAddress = JsonSerializer.Deserialize<AddressDto>(order.ShippingAddress)!,
            BillingAddress = order.BillingAddress != null
                ? JsonSerializer.Deserialize<AddressDto>(order.BillingAddress)
                : null,
            PaymentMethod = order.PaymentMethod,
            CreatedAt = order.CreatedAt,
            UpdatedAt = order.UpdatedAt
        };
    }

    private string GenerateOrderNumber()
    {
        return $"OV-{Guid.NewGuid().ToString("N")[..8].ToUpper()}";
    }
}
