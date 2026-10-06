# .NET Developer Quick Start Guide

Welcome! This guide will help you get started with the Orchard & Vine project as a .NET developer.

## 🚀 Prerequisites

- **.NET 8 SDK** - [Download here](https://dotnet.microsoft.com/download/dotnet/8.0)
- **SQL Server** (LocalDB or full instance)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Visual Studio Code** with C# extension OR **Visual Studio 2022**

## 📦 Initial Setup

### 1. Clone and Navigate

```bash
git clone https://github.com/YOUR_USERNAME/orchard-and-vine.git
cd orchard-and-vine
```

### 2. Setup Frontend

```bash
npm install
```

### 3. Setup Backend

```bash
cd backend/OrchardAndVine.API
dotnet restore
```

### 4. Configure Database

Update connection string in `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=OrchardAndVineDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

### 5. Create Database

```bash
# Install EF Core tools (if not already installed)
dotnet tool install --global dotnet-ef

# Create and apply migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 6. Run the Application

**Option A: Using VS Code Tasks**
1. Open the project in VS Code
2. Press `Ctrl+Shift+P` → "Tasks: Run Task"
3. Select "Run Full Stack (Frontend + Backend)"

**Option B: Manual**

Terminal 1 (Backend):
```bash
cd backend/OrchardAndVine.API
dotnet watch run
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 7. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger

## 🧪 Testing the API

### Using REST Client Extension

1. Open `api-tests.http` in VS Code
2. Click "Send Request" above any request
3. Responses will appear in a new panel

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123!"}'

# Get products
curl http://localhost:5000/api/products
```

## 📁 Project Structure Overview

```
orchard-and-vine/
├── src/                          # React frontend
│   ├── services/                 # API client services
│   │   ├── apiClient.ts          # Axios configuration
│   │   ├── productService.ts     # Product API calls
│   │   ├── authService.ts        # Auth API calls
│   │   └── orderService.ts       # Order API calls
│   └── types/
│       └── api.ts                # TypeScript types matching .NET DTOs
├── backend/
│   └── OrchardAndVine.API/       # .NET Web API
│       ├── Controllers/          # API endpoints
│       ├── Models/
│       │   ├── DTOs/             # Data Transfer Objects
│       │   ├── Entities/         # Database entities
│       │   └── Requests/         # Request models
│       ├── Services/
│       │   ├── Interfaces/       # Service contracts
│       │   └── Implementations/  # Business logic
│       └── Data/
│           └── ApplicationDbContext.cs
└── api-tests.http                # API test requests
```

## 🔑 Key Concepts

### API Response Format

All API responses follow this pattern:

```csharp
// Success
{
  "data": { ... },
  "message": "Success"
}

// Error
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": ["The Email field is required."]
  }
}
```

### Authentication

1. **Register:** `POST /api/auth/register`
2. **Login:** `POST /api/auth/login` → returns JWT token
3. **Use Token:** Include in header: `Authorization: Bearer {token}`
4. **Refresh:** `POST /api/auth/refresh-token`

### Database Migrations

```bash
# Add migration
dotnet ef migrations add AddProductImages

# Apply migrations
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# List migrations
dotnet ef migrations list
```

## 🐛 Debugging

### VS Code

1. Open the project in VS Code
2. Install recommended extensions
3. Press `F5` to start debugging
4. Set breakpoints in C# or TypeScript code

### Visual Studio 2022

1. Open `OrchardAndVine.sln`
2. Set startup project to `OrchardAndVine.API`
3. Press `F5` to debug

## 📚 Common Tasks

### Add a New API Endpoint

1. Create DTO in `Models/DTOs/`
2. Create request model in `Models/Requests/`
3. Add method to service interface
4. Implement in service class
5. Add controller action

### Add a New Service

1. Create interface in `Services/Interfaces/`
2. Implement in `Services/`
3. Register in `Program.cs`:
   ```csharp
   builder.Services.AddScoped<IMyService, MyService>();
   ```

### Seed Database

Create a `Data/SeedData.cs` file:

```csharp
public static class SeedData
{
    public static void Initialize(ApplicationDbContext context)
    {
        if (context.Products.Any()) return;
        
        context.Products.AddRange(
            new Product { Name = "Alphonso Mango", Price = 89.99m, ... }
        );
        
        context.SaveChanges();
    }
}
```

Call in `Program.cs`:

```csharp
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    SeedData.Initialize(context);
}
```

## 🚀 Deployment

### Build for Production

```bash
# Frontend
npm run build

# Backend
cd backend/OrchardAndVine.API
dotnet publish -c Release -o ./publish
```

### Deploy to Azure

```bash
# Install Azure CLI
# Login
az login

# Create resources
az group create --name OrchardAndVineRG --location eastus

# Create App Service
az webapp create --resource-group OrchardAndVineRG --plan MyAppServicePlan --name orchard-and-vine-api --runtime "DOTNET:8.0"

# Deploy
az webapp deploy --resource-group OrchardAndVineRG --name orchard-and-vine-api --src-path ./publish
```

## 📖 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [JWT Authentication](https://docs.microsoft.com/aspnet/core/security/authentication/jwt)
- [Backend Documentation](./DOTNET_BACKEND.md)

## 💡 Tips

- Use `dotnet watch run` for hot reload during development
- Keep DTOs separate from entities
- Use AutoMapper for entity-to-DTO mapping
- Validate all input with FluentValidation
- Log errors with proper context
- Use async/await consistently
- Follow REST API conventions

## 🆘 Troubleshooting

### Database Connection Issues

```bash
# Check if LocalDB is installed
sqllocaldb info

# Create instance if needed
sqllocaldb create MSSQLLocalDB
sqllocaldb start MSSQLLocalDB
```

### Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

### CORS Errors

Ensure frontend URL is in `appsettings.json`:

```json
{
  "CorsOrigins": [
    "http://localhost:3000"
  ]
}
```

---

Happy coding! 🎉
