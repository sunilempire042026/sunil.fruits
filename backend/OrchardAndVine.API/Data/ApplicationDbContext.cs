using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OrchardAndVine.API.Models.Entities;
using System.Text.Json;

namespace OrchardAndVine.API.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Product configuration
        builder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Details).HasConversion(
                v => v,
                v => v
            );
            entity.HasIndex(p => p.Category);
            entity.HasIndex(p => p.Name);
        });

        // Order configuration
        builder.Entity<Order>(entity =>
        {
            entity.HasIndex(o => o.OrderNumber).IsUnique();
            entity.HasIndex(o => o.UserId);
            entity.HasIndex(o => o.Status);
        });

        // OrderItem configuration
        builder.Entity<OrderItem>(entity =>
        {
            entity.HasIndex(oi => new { oi.OrderId, oi.ProductId });
        });

        // RefreshToken configuration
        builder.Entity<RefreshToken>(entity =>
        {
            entity.HasIndex(rt => rt.Token).IsUnique();
            entity.HasIndex(rt => rt.UserId);
        });

        // Seed data
        SeedData(builder);
    }

    private static void SeedData(ModelBuilder builder)
    {
        var products = new List<Product>
        {
            new()
            {
                Id = 1,
                Name = "Alphonso Mango",
                Origin = "Ratnagiri, India",
                Category = "tropical",
                Price = 89.99m,
                Unit = "box of 6",
                Description = "The \"King of Mangoes\" — prized for its rich, creamy texture and saffron-colored flesh with an intoxicatingly sweet aroma.",
                Details = JsonSerializer.Serialize(new[] {
                    "Hand-picked at peak ripeness from century-old orchards",
                    "Naturally ripened — no chemical agents used",
                    "GI-tagged for authentic Ratnagiri origin",
                    "Ships in temperature-controlled packaging",
                    "Best enjoyed within 5 days of delivery"
                }),
                Rating = 4.9m,
                Reviews = 342,
                InStock = true,
                Season = "April – June",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = 2,
                Name = "Ruby Roman Grapes",
                Origin = "Ishikawa, Japan",
                Category = "berry",
                Price = 149.99m,
                Unit = "bunch",
                Description = "An exquisite luxury grape variety, each berry the size of a ping-pong ball with an impossibly sweet, wine-like flavor.",
                Details = JsonSerializer.Serialize(new[] {
                    "Each bunch weighs over 300g with Brix level ≥18",
                    "Grown in climate-controlled greenhouses",
                    "Only 300 bunches produced per season",
                    "Individual berries tested for sugar content",
                    "Arrives in premium presentation box"
                }),
                Rating = 5.0m,
                Reviews = 87,
                InStock = true,
                Season = "July – September",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = 3,
                Name = "Yubari King Melon",
                Origin = "Hokkaido, Japan",
                Category = "melon",
                Price = 199.99m,
                Unit = "whole melon",
                Description = "A hybrid crown melon with perfectly netted skin and flesh so sweet it melts on the tongue. The pinnacle of melon craftsmanship.",
                Details = JsonSerializer.Serialize(new[] {
                    "Cultivated by master farmers with 50+ years experience",
                    "Each vine produces only one melon for maximum flavor",
                    "Perfectly round with symmetrical netting pattern",
                    "Flesh has a unique creamy, melt-in-mouth texture",
                    "Comes with certificate of authenticity"
                }),
                Rating = 4.8m,
                Reviews = 156,
                InStock = true,
                Season = "June – August",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = 4,
                Name = "White Strawberry",
                Origin = "Nagano, Japan",
                Category = "berry",
                Price = 64.99m,
                Unit = "box of 8",
                Description = "Ethereal pearl-white berries with delicate pink seeds and a flavor reminiscent of pineapple and cotton candy.",
                Details = JsonSerializer.Serialize(new[] {
                    "Rare \"White Jewel\" variety (Shiroi Houseki)",
                    "Naturally white — not bleached or modified",
                    "Lower acidity than red strawberries",
                    "Each berry hand-inspected for perfection",
                    "Packaged in silk-lined presentation box"
                }),
                Rating = 4.7m,
                Reviews = 218,
                InStock = true,
                Season = "December – March",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = 5,
                Name = "Buddha's Hand Citron",
                Origin = "Calabria, Italy",
                Category = "citrus",
                Price = 34.99m,
                Unit = "single fruit",
                Description = "A stunning fingered citrus with intense floral aroma. No pulp — all fragrant zest, perfect for cooking and garnishing.",
                Details = JsonSerializer.Serialize(new[] {
                    "Each fruit is unique — no two look alike",
                    "Almost entirely zest with no bitter pith",
                    "Intensely aromatic — perfumes an entire room",
                    "Ideal for zesting, candying, or infusing",
                    "Makes a striking natural centerpiece"
                }),
                Rating = 4.6m,
                Reviews = 94,
                InStock = true,
                Season = "November – February",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                Id = 6,
                Name = "Densuke Watermelon",
                Origin = "Hokkaido, Japan",
                Category = "melon",
                Price = 129.99m,
                Unit = "whole melon",
                Description = "The world's most expensive watermelon — impossibly dark green skin with flesh so crisp and sweet it shatters like glass.",
                Details = JsonSerializer.Serialize(new[] {
                    "Only grown in Toma town, Hokkaido",
                    "Maximum 100 per farmer per season",
                    "Brix sugar level guaranteed ≥11",
                    "Distinctive jet-black rind with no stripes",
                    "Auctioned annually for record-breaking prices"
                }),
                Rating = 4.9m,
                Reviews = 63,
                InStock = true,
                Season = "June – August",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        builder.Entity<Product>().HasData(products);
    }
}
