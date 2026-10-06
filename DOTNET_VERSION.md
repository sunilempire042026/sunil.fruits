# .NET Version Information

## Current Version: .NET 10.0 (LTS)

This project has been upgraded to **.NET 10.0**, which is the current Long Term Support (LTS) release as of 2026.

## Version History

| Version | Release Date | Support Type | Status |
|---------|--------------|--------------|--------|
| .NET 10.0 | November 2025 | **LTS (3 years)** | ✅ **Current** |
| .NET 9.0 | November 2024 | STS (18 months) | ⚠️ End of support: May 2026 |
| .NET 8.0 | November 2023 | LTS (3 years) | ⚠️ End of support: November 2026 |

## Why .NET 10?

### Long Term Support (LTS)
- **3 years of support** (until November 2028)
- Production-ready and stable
- Recommended for enterprise applications

### Key Improvements in .NET 10
- **Performance enhancements** across the runtime
- **C# 14** language features
- **EF Core 10** with improved query performance
- **ASP.NET Core 10** with new minimal API features
- **Enhanced security** and cryptography updates
- **Better container support** with Ubuntu-based images

### What's New in .NET 10
1. **HybridCache** - Unified caching abstraction
2. **OpenAPI improvements** - Better API documentation
3. **Rate limiting enhancements** - More flexible throttling
4. **SignalR improvements** - Better real-time communication
5. **Blazor United** - Unified server and client rendering
6. **Native AOT** - Improved ahead-of-time compilation
7. **Performance** - Faster startup, lower memory usage

## Migration from .NET 8

The project was originally built on .NET 8.0 and has been upgraded to .NET 10.0. The migration involved:

### Changes Made
1. ✅ Updated `TargetFramework` to `net10.0` in `.csproj`
2. ✅ Updated all NuGet packages to 10.0.x versions
3. ✅ Updated `global.json` to pin SDK version
4. ✅ Updated documentation to reflect .NET 10
5. ✅ Updated Docker images to use .NET 10 base images
6. ✅ Updated Visual Studio launch configurations

### Breaking Changes Addressed
- **None** - Our codebase uses standard patterns that are fully compatible with .NET 10
- All Entity Framework Core queries work without modification
- JWT authentication remains compatible
- AutoMapper configuration unchanged
- Controller patterns remain the same

## Prerequisites

To work with this project, you need:

### .NET SDK
```bash
# Check your current version
dotnet --version

# Install .NET 10 SDK
# Download from: https://dotnet.microsoft.com/download/dotnet/10.0
```

### Visual Studio
- **Visual Studio 2022** version 17.12 or later
- Or **Visual Studio Code** with C# Dev Kit extension

### Verify Installation
```bash
dotnet --list-sdks
# Should show: 10.0.xxx [path]
```

## Running the Backend

```bash
cd backend/OrchardAndVine.API

# Restore packages
dotnet restore

# Run migrations
dotnet ef database update

# Start the API
dotnet run

# Or with hot reload
dotnet watch run
```

## Deployment

### Azure App Service
```bash
az webapp create --runtime "DOTNET:10.0" ...
```

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
```

## Support Timeline

- **November 2025** - .NET 10 released (LTS)
- **November 2026** - .NET 8 LTS ends
- **November 2028** - .NET 10 LTS ends

## Future Upgrades

The next LTS release will be **.NET 12** (November 2027). Standard Term Support releases (.NET 11 in 2026) will be available but are not recommended for production.

## Resources

- [.NET 10 Documentation](https://docs.microsoft.com/dotnet/core/whats-new/dotnet-10)
- [.NET 10 Release Notes](https://github.com/dotnet/core/blob/main/release-notes/10.0/10.0.0.md)
- [Migration Guide](https://docs.microsoft.com/dotnet/core/migration/100)
- [Breaking Changes](https://docs.microsoft.com/dotnet/core/compatibility/10)

---

**This project is built on the latest .NET LTS release for maximum stability and support.** 🚀
