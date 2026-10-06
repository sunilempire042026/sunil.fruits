using System.ComponentModel.DataAnnotations;

namespace OrchardAndVine.API.Models.Requests;

public class CreateProductRequest
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Origin { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [Range(0.01, 99999.99)]
    public decimal Price { get; set; }

    [Required]
    [StringLength(100)]
    public string Unit { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public List<string> Details { get; set; } = new();
    public string? ImageUrl { get; set; }

    [Required]
    [StringLength(100)]
    public string Season { get; set; } = string.Empty;
}

public class UpdateProductRequest : CreateProductRequest
{
    [Required]
    public int Id { get; set; }
}
