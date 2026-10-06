# Opening Orchard & Vine in Microsoft Visual Studio

This guide explains how to open and work with the Orchard & Vine project in **Microsoft Visual Studio 2022** (Community, Professional, or Enterprise).

## 📋 Prerequisites

### Required Visual Studio Version
- **Visual Studio 2022** (version 17.8 or later recommended)
- Community edition is free and fully supported

### Required Workloads

During Visual Studio installation (or via the Visual Studio Installer), ensure these workloads are installed:

#### 1. ASP.NET and Web Development
- **Workload:** "ASP.NET and web development"
- Includes: .NET 10 SDK (LTS), IIS Express, NuGet package manager

#### 2. Node.js Development
- **Workload:** "Node.js development"
- Includes: Node.js tools, npm integration, JavaScript/TypeScript IntelliSense

#### 3. Data Storage and Processing (Optional but Recommended)
- **Workload:** "Data storage and processing"
- Includes: SQL Server Data Tools, Entity Framework tools

### Installing Missing Workloads

If you already have Visual Studio installed:

1. Open **Visual Studio Installer**
2. Click **Modify** on your Visual Studio installation
3. Check the required workloads listed above
4. Click **Modify** to install

## 🚀 Step-by-Step: Opening the Project

### Method 1: Open Solution File (Recommended)

1. **Launch Visual Studio 2022**

2. **Click "Open a project or solution"** (or File → Open → Project/Solution)

3. **Navigate to the project folder** and select:
   ```
   OrchardAndVine.sln
   ```

4. **Click "Open"**

5. Visual Studio will load both projects:
   - ✅ `OrchardAndVine.API` (.NET backend)
   - ✅ `OrchardAndVine.Frontend` (Node.js frontend)

### Method 2: Open Folder

1. **Launch Visual Studio 2022**

2. **Click "Open a local folder"**

3. **Navigate to and select** the `orchard-and-vine` folder

4. Visual Studio will detect both the .NET project and Node.js project

## 🔧 Initial Setup in Visual Studio

### 1. Restore NuGet Packages

Visual Studio should automatically restore NuGet packages. If not:

1. Right-click the solution in **Solution Explorer**
2. Select **"Restore NuGet Packages"**

Or use the Package Manager Console:
```
Update-Package -reinstall
```

### 2. Install npm Packages

1. In **Solution Explorer**, expand the `src` folder
2. Right-click on `package.json`
3. Select **"Restore Packages"** (or "npm install")

Or open **Developer Command Prompt** from Visual Studio:
```
Tools → Command Line → Developer Command Prompt
cd src
npm install
```

### 3. Set Up the Database

Open the **Package Manager Console**:
```
View → Other Windows → Package Manager Console
```

Run these commands:
```powershell
# Set default project to OrchardAndVine.API
PM> cd backend\OrchardAndVine.API

# Create initial migration
PM> Add-Migration InitialCreate

# Apply to database
PM> Update-Database
```

### 4. Configure Startup Projects

1. Right-click the **Solution** in Solution Explorer
2. Select **"Set Startup Projects..."**
3. Choose **"Multiple startup projects"**
4. Set both projects to **"Start"**:
   - `OrchardAndVine.API` → Start
   - `OrchardAndVine.Frontend` → Start
5. Click **OK**

## ▶️ Running the Application

### Option 1: Start Both Projects (Recommended)

1. Press **F5** or click the **Green Play Button** (▶️)

2. Visual Studio will launch both:
   - Backend API at `http://localhost:5000`
   - Frontend at `http://localhost:3000`

3. Your browser will open automatically

### Option 2: Run Projects Separately

**Backend Only:**
1. Right-click `OrchardAndVine.API` in Solution Explorer
2. Select **"Set as Startup Project"**
3. Press **F5**

**Frontend Only:**
1. Right-click `OrchardAndVine.Frontend` in Solution Explorer
2. Select **"Set as Startup Project"**
3. Press **F5**

### Option 3: Using Task Runner Explorer

1. Open Task Runner Explorer:
   ```
   View → Other Windows → Task Runner Explorer
   ```

2. You'll see npm scripts:
   - `dev` - Start development server
   - `build` - Build for production
   - `preview` - Preview production build

3. Double-click a task to run it

## 🐛 Debugging in Visual Studio

### Debug Backend (.NET)

1. Set breakpoints in C# code (click left margin)
2. Press **F5** to start debugging
3. Backend will launch with debugger attached
4. Test API endpoints - breakpoints will be hit

### Debug Frontend (JavaScript/TypeScript)

1. Set breakpoints in `.tsx` or `.ts` files
2. Press **F5** to start debugging
3. Frontend will launch in browser
4. Visual Studio will attach JavaScript debugger
5. Breakpoints will work in browser

### Debug Both Simultaneously

1. Set **Multiple startup projects** (see above)
2. Set breakpoints in both C# and TypeScript files
3. Press **F5**
4. Both debuggers will attach
5. You can step through frontend and backend code

## 🧪 Testing the API

### Using Swagger UI

1. Run the backend project
2. Navigate to: `http://localhost:5000/swagger`
3. Test all API endpoints interactively

### Using Visual Studio's HTTP File

1. Open `api-tests.http` in Visual Studio
2. Click the **"Run"** button above each request
3. View responses in the output window

## 📁 Solution Explorer Layout

```
Solution 'OrchardAndVine' (2 projects)
│
├── OrchardAndVine.API (C#)
│   ├── Connected Services
│   ├── Dependencies
│   ├── Controllers
│   │   └── ProductsController.cs
│   ├── Models
│   │   ├── DTOs
│   │   ├── Entities
│   │   └── Requests
│   ├── Services
│   │   └── Interfaces
│   ├── Data
│   ├── Properties
│   │   └── launchSettings.json
│   ├── appsettings.json
│   ├── Program.cs
│   └── OrchardAndVine.API.csproj
│
└── OrchardAndVine.Frontend (Node.js)
    ├── Dependencies (npm)
    ├── src
    │   ├── data
    │   ├── services
    │   ├── types
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── public
    ├── package.json
    ├── tsconfig.json
    └── vite.config.js
```

## ⚙️ Visual Studio Settings

### Recommended Extensions

Install these from **Extensions → Manage Extensions**:

1. **TypeScript Editor** (built-in)
2. **EditorConfig** (built-in)
3. **NuGet Package Manager** (built-in)
4. **SQL Server Data Tools** (for database work)
5. **GitHub Extension** (for version control)

### Configure Editor

1. **Tools → Options → Text Editor**
2. Configure for C#, JavaScript, TypeScript
3. Set tab size to 2 for frontend, 4 for backend
4. Enable "Format on Save"

### Configure Build

1. **Tools → Options → Projects and Solutions**
2. Set build output verbosity as needed
3. Configure parallel project builds

## 🔨 Common Tasks

### Build the Solution

- **Menu:** Build → Build Solution
- **Shortcut:** `Ctrl+Shift+B`

### Clean the Solution

- **Menu:** Build → Clean Solution

### Rebuild the Solution

- **Menu:** Build → Rebuild Solution

### Publish the Backend

1. Right-click `OrchardAndVine.API`
2. Select **"Publish..."**
3. Choose target (Azure, Folder, etc.)
4. Follow the wizard

### Publish the Frontend

1. Open **Developer Command Prompt**
2. Run:
   ```
   cd src
   npm run build
   ```
3. Output will be in `dist/` folder

## 🗄️ Database Tools

### Server Explorer

1. Open **Server Explorer**: `View → Server Explorer`
2. Expand **Data Connections**
3. Right-click → **"Add Connection..."**
4. Connect to your SQL Server/LocalDB
5. Browse tables, views, stored procedures

### Entity Framework Tools

1. Open **Package Manager Console**
2. Use EF commands:
   ```powershell
   Add-Migration MigrationName
   Update-Database
   Remove-Migration
   Script-Migration
   ```

## 📦 Package Management

### NuGet Packages (Backend)

1. Right-click project → **"Manage NuGet Packages"**
2. Browse, install, update packages
3. Or use Package Manager Console:
   ```powershell
   Install-Package PackageName
   Update-Package PackageName
   ```

### npm Packages (Frontend)

1. Right-click `package.json` → **"Manage npm Packages"**
2. Or use **Task Runner Explorer**
3. Or use **Developer Command Prompt**:
   ```
   npm install package-name
   npm update
   ```

## 🔄 Source Control

### Git Integration

1. **Git Changes** window: `View → Git Changes`
2. Stage, commit, push changes
3. View history, branches, conflicts

### Azure DevOps

1. Install **Azure DevOps** extension
2. Connect to your Azure DevOps organization
3. Manage work items, builds, releases

## 🚀 Deployment

### Deploy to Azure (Backend)

1. Right-click `OrchardAndVine.API`
2. Select **"Publish..."**
3. Choose **Azure App Service**
4. Sign in to Azure
5. Create new or select existing App Service
6. Click **Publish**

### Deploy to Azure (Frontend)

1. Build frontend: `npm run build`
2. Use **Azure Static Web Apps** or **Azure App Service**
3. Upload `dist/` folder contents

## 💡 Tips & Shortcuts

### Useful Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Build Solution | `Ctrl+Shift+B` |
| Start Debugging | `F5` |
| Start Without Debugging | `Ctrl+F5` |
| Stop Debugging | `Shift+F5` |
| Toggle Breakpoint | `F9` |
| Step Over | `F10` |
| Step Into | `F11` |
| Go to Definition | `F12` |
| Find All References | `Shift+F12` |
| Quick Actions | `Ctrl+.` |
| Solution Explorer | `Ctrl+Alt+L` |
| Team Explorer | `Ctrl+\, Ctrl+M` |

### Productivity Tips

1. **Use Solution Filters** (`.slnf`) for large solutions
2. **Pin frequently used files** in Solution Explorer
3. **Use Live Unit Testing** for TDD
4. **Enable IntelliCode** for AI-assisted coding
5. **Use CodeLens** to see references and test status

## 🆘 Troubleshooting

### "Node.js tools not installed"

1. Open Visual Studio Installer
2. Modify your installation
3. Install "Node.js development" workload

### "Cannot connect to database"

1. Check connection string in `appsettings.json`
2. Ensure SQL Server/LocalDB is running
3. Verify user permissions

### "npm packages not restored"

1. Right-click `package.json` → "Restore Packages"
2. Or run `npm install` in terminal
3. Check Node.js is installed and in PATH

### "Breakpoints not hitting"

1. Ensure project is built in **Debug** mode
2. Check **"Enable Just My Code"** is disabled if needed
3. Clean and rebuild solution

### "Port already in use"

1. Stop all running instances
2. Change port in `launchSettings.json`
3. Or kill process using the port:
   ```
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

## 📚 Additional Resources

- [Visual Studio Documentation](https://docs.microsoft.com/visualstudio/)
- [ASP.NET Core in Visual Studio](https://docs.microsoft.com/visualstudio/aspnet/)
- [Node.js in Visual Studio](https://docs.microsoft.com/visualstudio/javascript/)
- [Entity Framework Tools](https://docs.microsoft.com/ef/ef6/)

## 🎯 Next Steps

1. ✅ Open the solution in Visual Studio
2. ✅ Restore all packages (NuGet + npm)
3. ✅ Set up the database
4. ✅ Configure startup projects
5. ✅ Run and debug the application
6. ✅ Explore the code and make changes
7. ✅ Deploy to Azure or your preferred host

---

**Happy coding with Visual Studio!** 🎉

For questions or issues, refer to the main [README.md](./README.md) or [DOTNET_QUICKSTART.md](./DOTNET_QUICKSTART.md).
