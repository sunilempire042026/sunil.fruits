# Orchard & Vine - .NET 10 Web API Backend

Complete ASP.NET Core 10.0 (LTS) Web API backend for the Orchard & Vine specialty fruit e-commerce platform.

## 🏗️ Architecture

```
backend/OrchardAndVine.API/
├── Controllers/              # API endpoints
│   ├── AuthController.cs     # Authentication (JWT)
│   ├── ProductsController.cs # Product CRUD
│   ├── OrdersController.cs   # Order management
│   └── CategoriesController.cs
├── Models/
│   ├── Entities/             # Database entities
│   │   ├── Product.cs
│   │   ├── Order.cs
│   │   ├── OrderItem.cs
│   │   ├── ApplicationUser.cs
│   │   └── RefreshToken.cs
│   ├── DTOs/                 # Data Transfer Objects
│   │   ├── ProductDto.cs
│   │   ├── OrderDto.cs
│   │   └── AuthDto.cs
│   └── Requests/             # Request models
│       ├── ProductRequests.cs
│       ├── OrderRequests.cs
│       └── AuthRequests.cs
├── Services/
│   ├── Interfaces/           # Service contracts
│   │   ├── IProductService.cs
│   │   ├── IOrderService.cs
│   │   └── IAuthService.cs
│   ├── ProductService.cs     # Business logic
│   ├── OrderService.cs
│   └── AuthService.cs
├── Data/
│   └── ApplicationDbContext.cs  # EF Core DbContext
├── Mapping/
│   └── MappingProfile.cs     # AutoMapper profiles
├── Middleware/
│   └── ExceptionMiddleware.cs  # Global error handling
├── Properties/
│   └── launchSettings.json
├── Program.cs                # Application entry point
├── appsettings.json
└── OrchardAndVine.API.csproj
```

## 🚀 Quick Start

### Prerequisites

- **.NET 10 SDK** (LTS) - [Download](https://dotnet.microsoft.com/download/dotnet/10.0)
- **SQL Server** (LocalDB or full instance)
- **Visual Studio 2022** (17.12+) or **VS Code with C# Dev Kit**

### Setup Steps

1. **Navigate to backend folder**
   ```bash
   cd backend/OrchardAndVine.API
   ```

2. **Restore NuGet packages**
   ```bash
   dotnet restore
   ```

3. **Configure database connection**
   
   Edit `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=OrchardAndVineDb;Trusted_Connection=True;MultipleActiveResultSets=true"
     }
   }
   ```

4. **Install EF Core tools** (if not installed)
   ```bash
   dotnet tool install --global dotnet-ef
   ```

5. **Create and apply migrations**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

6. **Run the API**
   ```bash
   dotnet run
   ```

7. **Access Swagger UI**
   - Navigate to: `http://localhost:5000/swagger`

## 🔐 Authentication

### JWT Token Flow

1. **Register**: `POST /api/auth/register`
   ```json
   {
     "email": "user@example.com",
     "password": "Password123!",
     "confirmPassword": "Password123!",
     "firstName": "John",
     "lastName": "Doe"
   }
   ```

2. **Login**: `POST /api/auth/login`
   ```json
   {
     "email": "user@example.com",
     "password": "Password123!",
     "rememberMe": true
   }
   ```
   **Response:**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "refreshToken": "base64token...",
     "expiresAt": "2024-01-01T12:00:00Z",
     "user": {
       "id": "guid",
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "roles": ["Customer"],
       "emailConfirmed": true
     }
   }
   ```

3. **Use Token**: Include in all authenticated requests
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```

4. **Refresh Token**: `POST /api/auth/refresh-token`
   ```json
   {
     "refreshToken": "base64token..."
   }
   ```

5. **Logout**: `POST /api/auth/logout` (requires auth)

### Roles

- **Customer** - Default role for registered users
- **Admin** - Can manage products (create, update, delete)

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login and get JWT |
| POST | `/refresh-token` | No | Refresh JWT token |
| POST | `/logout` | Yes | Logout and revoke tokens |
| GET | `/user` | Yes | Get current user |

### Products (`/api/products`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all products (paginated) |
| GET | `/{id}` | No | Get product by ID |
| GET | `/search?query={q}` | No | Search products |
| GET | `/?category={cat}` | No | Filter by category |
| POST | `/` | Admin | Create product |
| PUT | `/{id}` | Admin | Update product |
| DELETE | `/{id}` | Admin | Delete product |

### Orders (`/api/orders`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | Get user's orders |
| GET | `/{id}` | Yes | Get order details |
| POST | `/` | Yes | Create order |
| PUT | `/{id}/cancel` | Yes | Cancel order |

### Categories (`/api/categories`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all categories |

## 🗄️ Database Schema

### Products Table
```sql
Products
├── Id (int, PK)
├── Name (nvarchar(200))
├── Origin (nvarchar(200))
├── Category (nvarchar(100))
├── Price (decimal(18,2))
├── Unit (nvarchar(100))
├── Description (nvarchar(max))
├── Details (nvarchar(max)) -- JSON array
├── ImageUrl (nvarchar(500))
├── Rating (decimal(3,2))
├── Reviews (int)
├── InStock (bit)
├── Season (nvarchar(100))
├── CreatedAt (datetime2)
└── UpdatedAt (datetime2)
```

### Orders Table
```sql
Orders
├── Id (uniqueidentifier, PK)
├── OrderNumber (nvarchar(50), unique)
├── UserId (nvarchar(450), FK)
├── Subtotal (decimal(18,2))
├── ShippingCost (decimal(18,2))
├── Tax (decimal(18,2))
├── Total (decimal(18,2))
├── Status (nvarchar(50))
├── ShippingAddress (nvarchar(max)) -- JSON
├── BillingAddress (nvarchar(max)) -- JSON
├── PaymentMethod (nvarchar(100))
├── Notes (nvarchar(max))
├── CreatedAt (datetime2)
└── UpdatedAt (datetime2)
```

### OrderItems Table
```sql
OrderItems
├── Id (int, PK)
├── ProductId (int, FK)
├── OrderId (uniqueidentifier, FK)
├── ProductName (nvarchar(200))
├── Quantity (int)
├── UnitPrice (decimal(18,2))
└── TotalPrice (decimal(18,2))
```

## 🧪 Testing the API

### Using Swagger UI

1. Run the API: `dotnet run`
2. Open: `http://localhost:5000/swagger`
3. Click "Authorize" button
4. Enter: `Bearer {your-token}`
5. Test endpoints

### Using REST Client (VS Code)

Open `api-tests.http` in the root folder and click "Send Request" above any request.

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'

# Get products
curl http://localhost:5000/api/products

# Create order (requires auth)
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "street": "123 Main St",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97201",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  }'
```

## 🔧 Configuration

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=OrchardAndVineDb;..."
  },
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyHereAtLeast32Characters!",
    "Issuer": "OrchardAndVine.API",
    "Audience": "OrchardAndVine.Client",
    "ExpirationInMinutes": 60
  },
  "CorsOrigins": [
    "http://localhost:3000",
    "https://orchardandvine.com"
  ]
}
```

### Environment-Specific Settings

- `appsettings.json` - Base configuration
- `appsettings.Development.json` - Development overrides
- `appsettings.Production.json` - Production settings

## 📦 NuGet Packages (.NET 10)

```xml
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="10.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="10.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="10.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="10.0.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="7.2.0" />
<PackageReference Include="AutoMapper" Version="13.0.1" />
```

## 🚀 Deployment

### Build for Production

```bash
dotnet publish -c Release -o ./publish
```

### Deploy to Azure App Service

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name OrchardAndVineRG --location eastus

# Create App Service Plan
az appservice plan create --name MyAppServicePlan --resource-group OrchardAndVineRG --sku B1

# Create Web App
az webapp create --resource-group OrchardAndVineRG --plan MyAppServicePlan --name orchard-and-vine-api --runtime "DOTNET:10.0"

# Deploy
az webapp deploy --resource-group OrchardAndVineRG --name orchard-and-vine-api --src-path ./publish
```

### Docker Deployment

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["OrchardAndVine.API.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OrchardAndVine.API.dll"]
```

## 🛠️ Development Commands

```bash
# Run in development mode with hot reload
dotnet watch run

# Build the project
dotnet build

# Run tests
dotnet test

# Add migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# List migrations
dotnet ef migrations list

# Clean build artifacts
dotnet clean

# Restore packages
dotnet restore
```

## 📚 Key Features

✅ **JWT Authentication** with refresh tokens  
✅ **Role-based Authorization** (Admin, Customer)  
✅ **Entity Framework Core** with SQL Server  
✅ **Repository Pattern** with service layer  
✅ **AutoMapper** for DTO mapping  
✅ **Global Exception Handling** middleware  
✅ **CORS** configuration  
✅ **Swagger/OpenAPI** documentation  
✅ **Input Validation** with Data Annotations  
✅ **Pagination** support  
✅ **Search & Filter** capabilities  
✅ **Seed Data** for initial products  

## 🔒 Security Best Practices

- JWT tokens with expiration
- Refresh token rotation
- Password hashing with ASP.NET Identity
- CORS restricted to specific origins
- Input validation on all endpoints
- Role-based authorization
- HTTPS enforced in production
- Sensitive data in environment variables

## 📖 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [JWT Authentication](https://docs.microsoft.com/aspnet/core/security/authentication/jwt)
- [Visual Studio Setup Guide](../VISUAL_STUDIO_SETUP.md)

---

**Built with ASP.NET Core 10.0 (LTS)** 🚀
