using OrchardAndVine.API.Models.DTOs;
using OrchardAndVine.API.Models.Requests;

namespace OrchardAndVine.API.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginRequest request, string ipAddress);
    Task<UserDto> RegisterAsync(RegisterRequest request);
    Task<LoginResponseDto> RefreshTokenAsync(RefreshTokenRequest request, string ipAddress);
    Task LogoutAsync(string userId);
    Task<UserDto?> GetCurrentUserAsync(string userId);
}
