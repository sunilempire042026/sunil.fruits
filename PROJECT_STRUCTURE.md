# Orchard & Vine - Complete Project Structure

```
orchard-and-vine/
│
├── 📱 FRONTEND (React + TypeScript + Vite)
│   ├── src/
│   │   ├── data/
│   │   │   └── products.ts              # Product data and types
│   │   ├── services/
│   │   │   ├── apiClient.ts             # Axios client with JWT auth
│   │   │   ├── productService.ts        # Product API service
│   │   │   ├── authService.ts           # Authentication service
│   │   │   └── orderService.ts          # Order API service
│   │   ├── types/
│   │   │   └── api.ts                   # TypeScript types matching .NET DTOs
│   │   ├── App.tsx                      # Main React component
│   │   ├── main.tsx                     # Entry point
│   │   ├── index.css                    # Global styles
│   │   └── vite-env.d.ts               # Vite environment types
│   ├── public/                          # Static assets
│   ├── .env.development                 # Dev environment config
│   ├── .env.production                  # Prod environment config
│   ├── .env.staging                     # Staging environment config
│   ├── package.json                     # npm dependencies
│   ├── tsconfig.json                    # TypeScript config
│   └── vite.config.js                   # Vite config
│
├── 🔧 BACKEND (.NET Core 8.0 Web API)
│   └── backend/
│       └── OrchardAndVine.API/
│           ├── Controllers/
│           │   ├── AuthController.cs         # JWT authentication
│           │   ├── ProductsController.cs     # Product CRUD
│           │   ├── OrdersController.cs       # Order management
│           │   └── CategoriesController.cs   # Categories
│           ├── Models/
│           │   ├── Entities/
│           │   │   ├── Product.cs            # Product entity
│           │   │   ├── Order.cs              # Order entity
│           │   │   ├── OrderItem.cs          # Order item entity
│           │   │   ├── ApplicationUser.cs    # User entity
│           │   │   └── RefreshToken.cs       # Refresh token entity
│           │   ├── DTOs/
│           │   │   ├── ProductDto.cs         # Product DTO
│           │   │   ├── OrderDto.cs           # Order DTO
│           │   │   └── AuthDto.cs            # Auth DTOs
│           │   └── Requests/
│           │       ├── ProductRequests.cs    # Product request models
│           │       ├── OrderRequests.cs      # Order request models
│           │       └── AuthRequests.cs       # Auth request models
│           ├── Services/
│           │   ├── Interfaces/
│           │   │   ├── IProductService.cs    # Product service interface
│           │   │   ├── IOrderService.cs      # Order service interface
│           │   │   └── IAuthService.cs       # Auth service interface
│           │   ├── ProductService.cs         # Product business logic
│           │   ├── OrderService.cs           # Order business logic
│           │   └── AuthService.cs            # Auth business logic
│           ├── Data/
│           │   └── ApplicationDbContext.cs    # EF Core DbContext
│           ├── Mapping/
│           │   └── MappingProfile.cs         # AutoMapper profiles
│           ├── Middleware/
│           │   └── ExceptionMiddleware.cs    # Global error handling
│           ├── Properties/
│           │   └── launchSettings.json       # Launch settings
│           ├── Program.cs                    # App entry point
│           ├── appsettings.json              # Configuration
│           ├── appsettings.Development.json
│           └── OrchardAndVine.API.csproj     # Project file
│
├── 🛠️ CONFIGURATION FILES
│   ├── .vscode/
│   │   ├── extensions.json              # VS Code extensions
│   │   ├── settings.json                # VS Code settings
│   │   ├── launch.json                  # Debug configurations
│   │   └── tasks.json                   # Build tasks
│   ├── .eslintrc.json                   # ESLint config
│   ├── .prettierrc                      # Prettier config
│   ├── .editorconfig                    # Editor config
│   ├── .gitignore                       # Git ignore
│   ├── OrchardAndVine.sln              # Visual Studio solution
│   └── api-tests.http                   # REST Client test file
│
└── 📚 DOCUMENTATION
    ├── README.md                        # Main project README
    ├── CONTRIBUTING.md                  # Contribution guide
    ├── LICENSE                          # MIT License
    ├── DOTNET_BACKEND.md               # .NET backend architecture
    ├── DOTNET_QUICKSTART.md            # .NET developer quick start
    ├── VISUAL_STUDIO_SETUP.md          # Visual Studio setup guide
    ├── VISUAL_STUDIO_QUICKREF.md       # VS quick reference
    └── backend/
        └── README.md                    # Backend-specific README
```

## 🎯 Key Features

### Frontend (React)
- ✅ 6 specialty fruit products with details
- ✅ Search and category filtering
- ✅ Product detail modals
- ✅ Shopping cart with quantity controls
- ✅ Multi-step checkout flow
- ✅ Responsive design (mobile + desktop)
- ✅ Toast notifications
- ✅ JWT authentication integration
- ✅ Type-safe API calls with TypeScript

### Backend (.NET Core 8)
- ✅ JWT authentication with refresh tokens
- ✅ Role-based authorization (Admin, Customer)
- ✅ Entity Framework Core with SQL Server
- ✅ Complete CRUD operations
- ✅ Order management system
- ✅ AutoMapper for DTO mapping
- ✅ Global exception handling
- ✅ Swagger/OpenAPI documentation
- ✅ Input validation
- ✅ CORS configuration
- ✅ Seed data for products

## 🚀 Quick Start

### Option 1: Visual Studio 2022

1. Open `OrchardAndVine.sln`
2. Install workloads: ASP.NET + Node.js
3. Restore packages (NuGet + npm)
4. Set multiple startup projects
5. Press F5

### Option 2: VS Code

1. Open folder in VS Code
2. Install recommended extensions
3. Run tasks: `Ctrl+Shift+P` → "Tasks: Run Task"
4. Select "Run Full Stack (Frontend + Backend)"

### Option 3: Command Line

**Backend:**
```bash
cd backend/OrchardAndVine.API
dotnet restore
dotnet ef database update
dotnet run
```

**Frontend:**
```bash
npm install
npm run dev
```

## 📡 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register user |
| `/api/auth/login` | POST | No | Login |
| `/api/auth/refresh-token` | POST | No | Refresh JWT |
| `/api/auth/logout` | POST | Yes | Logout |
| `/api/auth/user` | GET | Yes | Get current user |
| `/api/products` | GET | No | Get all products |
| `/api/products/{id}` | GET | No | Get product |
| `/api/products/search` | GET | No | Search products |
| `/api/products` | POST | Admin | Create product |
| `/api/products/{id}` | PUT | Admin | Update product |
| `/api/products/{id}` | DELETE | Admin | Delete product |
| `/api/orders` | GET | Yes | Get user orders |
| `/api/orders/{id}` | GET | Yes | Get order |
| `/api/orders` | POST | Yes | Create order |
| `/api/orders/{id}/cancel` | PUT | Yes | Cancel order |
| `/api/categories` | GET | No | Get categories |

## 🗄️ Database

- **SQL Server** (LocalDB or full instance)
- **Entity Framework Core** for ORM
- **Code-first migrations**
- **Seed data** included

## 🔐 Authentication Flow

1. Register → Get user account
2. Login → Get JWT token + refresh token
3. Use token in `Authorization: Bearer {token}` header
4. Refresh token when JWT expires
5. Logout → Revoke all tokens

## 📦 Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios

**Backend:**
- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server
- JWT Authentication
- AutoMapper
- Swagger

## 📚 Documentation

- [Main README](./README.md) - Project overview
- [Backend README](./backend/README.md) - .NET API details
- [Visual Studio Setup](./VISUAL_STUDIO_SETUP.md) - VS guide
- [.NET Quick Start](./DOTNET_QUICKSTART.md) - Developer guide
- [API Tests](./api-tests.http) - Test all endpoints

---

**Full-stack e-commerce application ready for production!** 🚀
