using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OrchardAndVine.API.Data;
using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Entities;
using OrchardAndVine.API.Models.Requests;
using OrchardAndVine.API.Services.Interfaces;

namespace OrchardAndVine.API.Services;

public class ProductService : IProductService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ProductService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PagedResult<ProductDto>> GetAllAsync(string? category, string? search, int page, int pageSize)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category.ToLower() == category.ToLower());

        if (!string.IsNullOrWhiteSpace(search))
        {
            var searchTerm = search.ToLower();
            query = query.Where(p =>
                p.Name.ToLower().Contains(searchTerm) ||
                p.Origin.ToLower().Contains(searchTerm) ||
                p.Description.ToLower().Contains(searchTerm));
        }

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(p => p.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var productDtos = _mapper.Map<List<ProductDto>>(items);

        return new PagedResult<ProductDto>
        {
            Items = productDtos,
            PageNumber = page,
            PageSize = pageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        };
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        return product == null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<List<ProductDto>> SearchAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
            return new List<ProductDto>();

        var searchTerm = query.ToLower();
        var products = await _context.Products
            .Where(p =>
                p.Name.ToLower().Contains(searchTerm) ||
                p.Origin.ToLower().Contains(searchTerm) ||
                p.Description.ToLower().Contains(searchTerm))
            .OrderBy(p => p.Name)
            .Take(20)
            .ToListAsync();

        return _mapper.Map<List<ProductDto>>(products);
    }

    public async Task<ProductDto> CreateAsync(CreateProductRequest request)
    {
        var product = new Product
        {
            Name = request.Name,
            Origin = request.Origin,
            Category = request.Category,
            Price = request.Price,
            Unit = request.Unit,
            Description = request.Description,
            Details = System.Text.Json.JsonSerializer.Serialize(request.Details),
            ImageUrl = request.ImageUrl,
            Season = request.Season,
            InStock = true,
            Rating = 0,
            Reviews = 0,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto> UpdateAsync(UpdateProductRequest request)
    {
        var product = await _context.Products.FindAsync(request.Id)
            ?? throw new KeyNotFoundException($"Product with ID {request.Id} not found");

        product.Name = request.Name;
        product.Origin = request.Origin;
        product.Category = request.Category;
        product.Price = request.Price;
        product.Unit = request.Unit;
        product.Description = request.Description;
        product.Details = System.Text.Json.JsonSerializer.Serialize(request.Details);
        product.ImageUrl = request.ImageUrl;
        product.Season = request.Season;
        product.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return _mapper.Map<ProductDto>(product);
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
            throw new KeyNotFoundException($"Product with ID {id} not found");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
}
