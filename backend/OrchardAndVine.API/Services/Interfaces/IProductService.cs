using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Requests;

namespace OrchardAndVine.API.Services.Interfaces;

public interface IProductService
{
    Task<PagedResult<ProductDto>> GetAllAsync(string? category, string? search, int page, int pageSize);
    Task<ProductDto?> GetByIdAsync(int id);
    Task<List<ProductDto>> SearchAsync(string query);
    Task<ProductDto> CreateAsync(CreateProductRequest request);
    Task<ProductDto> UpdateAsync(UpdateProductRequest request);
    Task DeleteAsync(int id);
}
