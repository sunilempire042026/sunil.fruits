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

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
orchard-and-vine/
├── src/
│   ├── data/
│   │   └── products.ts       # Product data and types
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── .vscode/                  # VS Code configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 VS Code Setup

This project includes optimized VS Code configurations:

### Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Auto Rename Tag** - Automatically rename paired HTML/XML tag
- **Path Intellisense** - Autocomplete filenames
- **NPM Intellisense** - Autocomplete npm packages

### Debugging

Launch configurations are included for debugging in Chrome or Edge:

1. Start the dev server: `npm run dev`
2. Press `F5` or go to Run → Start Debugging
3. Set breakpoints in your code

### Tasks

Available tasks (Terminal → Run Task):

- **Install Dependencies** - Run `npm install`
- **Run Development Server** - Start dev server
- **Build for Production** - Create production build
- **Preview Production Build** - Preview built app

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
