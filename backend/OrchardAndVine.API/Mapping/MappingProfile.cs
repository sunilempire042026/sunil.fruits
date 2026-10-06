using AutoMapper;
using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Entities;
using System.Text.Json;

namespace OrchardAndVine.API.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Product mappings
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.Details, opt => opt.MapFrom(src =>
                JsonSerializer.Deserialize<List<string>>(src.Details) ?? new List<string>()));

        CreateMap<ProductDto, Product>()
            .ForMember(dest => dest.Details, opt => opt.MapFrom(src =>
                JsonSerializer.Serialize(src.Details)));

        // Order mappings
        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items))
            .ForMember(dest => dest.ShippingAddress, opt => opt.MapFrom(src =>
                JsonSerializer.Deserialize<AddressDto>(src.ShippingAddress)))
            .ForMember(dest => dest.BillingAddress, opt => opt.MapFrom(src =>
                src.BillingAddress != null ? JsonSerializer.Deserialize<AddressDto>(src.BillingAddress) : null));

        CreateMap<OrderItem, OrderItemDto>();

        // User mappings
        CreateMap<ApplicationUser, UserDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.EmailConfirmed, opt => opt.MapFrom(src => src.EmailConfirmed));
    }
}
