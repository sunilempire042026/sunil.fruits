# Orchard & Vine - Specialty Fruit E-commerce

A modern, responsive specialty fruit e-commerce web application built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Visual Studio Code (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/orchard-and-vine.git
   cd orchard-and-vine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Features

- **Product Catalog**: 6 specialty fruits with detailed information
- **Search & Filter**: Real-time search and category filtering
- **Product Details**: Modal with comprehensive product information
- **Shopping Cart**: Slide-out cart with quantity controls
- **Checkout Flow**: Multi-step checkout with form validation
- **Responsive Design**: Optimized for desktop and mobile
- **Toast Notifications**: User feedback for actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for .NET API integration
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Backend (.NET 8)
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core** - ORM
- **SQL Server** - Database
- **JWT Authentication** - Secure API access
- **AutoMapper** - Object mapping
- **FluentValidation** - Request validation
- **Swagger/OpenAPI** - API documentation

## 📁 Project Structure

```
orchard-and-vine/
├── src/
│   ├── data/
│   │   └── products.ts       # Product data and types
│   ├── services/
│   │   ├── apiClient.ts      # Axios client with .NET API config
│   │   ├── productService.ts # Product API service
│   │   ├── authService.ts    # Authentication service
│   │   └── orderService.ts   # Order API service
│   ├── types/
│   │   └── api.ts            # .NET API response types
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── backend/
│   └── OrchardAndVine.API/   # .NET Web API project
│       ├── Controllers/      # API controllers
│       ├── Models/           # DTOs and entities
│       ├── Services/         # Business logic
│       └── Data/             # DbContext and migrations
├── public/                   # Static assets
├── .vscode/                  # VS Code configuration
├── .env.development          # Development environment
├── .env.production           # Production environment
├── api-tests.http            # REST Client test file
├── OrchardAndVine.sln        # .NET solution file
├── DOTNET_BACKEND.md         # .NET backend documentation
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 VS Code Setup

This project includes optimized VS Code configurations for both frontend and backend development:

### Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions:

**Frontend:**
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Auto Rename Tag** - Automatically rename paired HTML/XML tag
- **Path Intellisense** - Autocomplete filenames
- **NPM Intellisense** - Autocomplete npm packages

**Backend (.NET):**
- **C#** - C# language support
- **C# Dev Kit** - Enhanced C# development
- **.NET Install Tool** - .NET runtime management
- **Solution Explorer** - .NET solution management
- **Docker** - Container support
- **REST Client** - API testing (use `api-tests.http`)

### Debugging

Launch configurations are included for debugging:

**Frontend:**
1. Start the dev server: `npm run dev`
2. Press `F5` or go to Run → Start Debugging
3. Set breakpoints in your React code

**Backend:**
1. Open `OrchardAndVine.sln` in VS Code
2. Press `F5` to start debugging the .NET API
3. Set breakpoints in your C# code

**Full Stack:**
- Use "Full Stack Debug" configuration to debug both frontend and backend simultaneously

### Tasks

Available tasks (Terminal → Run Task):

**Frontend:**
- **Install Dependencies** - Run `npm install`
- **Run Development Server** - Start dev server
- **Build for Production** - Create production build
- **Preview Production Build** - Preview built app

**Backend (.NET):**
- **.NET: Build Backend** - Build the API
- **.NET: Run Backend** - Start the API server
- **.NET: Run Backend (Watch)** - Start with hot reload
- **.NET: Run Tests** - Run unit tests
- **.NET: Clean** - Clean build artifacts
- **.NET: Publish** - Publish for deployment
- **.NET: Restore Packages** - Restore NuGet packages
- **.NET: EF Migrations Add** - Add database migration
- **.NET: EF Migrations Update** - Update database

**Combined:**
- **Run Full Stack (Frontend + Backend)** - Start both servers

## 🔗 .NET Backend Integration

This frontend is designed to work seamlessly with a .NET Web API backend.

### Quick Start with Backend

1. **Setup the backend:**
   ```bash
   cd backend/OrchardAndVine.API
   dotnet restore
   dotnet ef database update
   dotnet run
   ```

2. **The API will be available at:** `http://localhost:5000`

3. **Swagger UI:** `http://localhost:5000/swagger`

4. **Test the API:**
   - Open `api-tests.http` in VS Code
   - Use the REST Client extension to run requests

### Environment Configuration

The frontend uses environment-specific configuration:

- `.env.development` - Development (localhost:5000)
- `.env.staging` - Staging environment
- `.env.production` - Production environment

### API Client

The frontend includes a pre-configured Axios client (`src/services/apiClient.ts`) that:
- Automatically attaches JWT tokens to requests
- Handles .NET API error responses
- Supports request/response interceptors
- Configures CORS for .NET backend

### Authentication Flow

1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login` → returns JWT token
3. Token stored in localStorage
4. All requests include `Authorization: Bearer {token}`
5. Token refresh: `POST /api/auth/refresh-token`

See [DOTNET_BACKEND.md](./DOTNET_BACKEND.md) for complete backend documentation.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🎨 Customization

### Adding New Products

Edit `src/data/products.ts` and add a new product object:

```typescript
{
  id: 7,
  name: 'Your Fruit Name',
  origin: 'Location',
  category: 'category-id',
  price: 99.99,
  unit: 'unit description',
  description: 'Description text',
  details: ['Detail 1', 'Detail 2'],
  emoji: '🍎',
  gradient: 'from-red-400 to-pink-400',
  rating: 4.5,
  reviews: 100,
  inStock: true,
  season: 'Season text',
}
```

### Changing Theme Colors

The app uses Tailwind's amber/orange color scheme. To customize:

1. Edit `tailwind.config.js` to add custom colors
2. Update component classes to use new colors

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/YOUR_USERNAME/orchard-and-vine](https://github.com/YOUR_USERNAME/orchard-and-vine)

---

Made with ❤️ using React, TypeScript, and Tailwind CSS
