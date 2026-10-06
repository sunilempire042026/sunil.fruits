using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrchardAndVine.API.Data;
using OrchardAndVine.API.Models.DTOs;

namespace OrchardAndVine.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Get all categories with product counts
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _context.Products
            .GroupBy(p => p.Category)
            .Select(g => new CategoryDto
            {
                Id = g.Key.ToLower(),
                Name = g.Key,
                ProductCount = g.Count()
            })
            .OrderBy(c => c.Name)
            .ToListAsync();

        // Add "All" category
        var allCategories = new List<CategoryDto>
        {
            new() { Id = "all", Name = "All Fruits", ProductCount = categories.Sum(c => c.ProductCount) }
        };
        allCategories.AddRange(categories);

        return Ok(allCategories);
    }
}
