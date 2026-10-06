# Visual Studio Quick Reference

## 🚀 Opening the Project

1. **Launch Visual Studio 2022**
2. **File → Open → Project/Solution**
3. **Select:** `OrchardAndVine.sln`
4. **Click Open**

## ⚙️ Required Workloads

Install via Visual Studio Installer:

- ✅ **ASP.NET and web development**
- ✅ **Node.js development**
- ✅ **Data storage and processing** (optional)

## 🔧 Initial Setup

```powershell
# Restore NuGet packages
Right-click solution → Restore NuGet Packages

# Install npm packages
Right-click src/package.json → Restore Packages

# Setup database (Package Manager Console)
cd backend\OrchardAndVine.API
Add-Migration InitialCreate
Update-Database
```

## ▶️ Running the Application

### Set Multiple Startup Projects

1. Right-click solution → **Set Startup Projects...**
2. Select **Multiple startup projects**
3. Set both to **Start**:
   - `OrchardAndVine.API` → Start
   - `OrchardAndVine.Frontend` → Start
4. Click **OK**

### Start Debugging

- Press **F5** or click **▶️ Green Play Button**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Swagger: `http://localhost:5000/swagger`

## 🐛 Debugging

### Set Breakpoints
- Click left margin in any code file
- Red dot appears

### Debug Commands
| Action | Shortcut |
|--------|----------|
| Start Debugging | `F5` |
| Stop Debugging | `Shift+F5` |
| Step Over | `F10` |
| Step Into | `F11` |
| Toggle Breakpoint | `F9` |

## 📦 Package Management

### NuGet (Backend)
```powershell
# Package Manager Console
Install-Package PackageName
Update-Package PackageName

# Or use GUI
Right-click project → Manage NuGet Packages
```

### npm (Frontend)
```bash
# Developer Command Prompt
cd src
npm install package-name

# Or use Task Runner Explorer
View → Other Windows → Task Runner Explorer
```

## 🗄️ Database Commands

### Package Manager Console
```powershell
# Add migration
Add-Migration MigrationName

# Update database
Update-Database

# Remove last migration
Remove-Migration

# List migrations
Get-Migration
```

## 🧪 Testing API

### Swagger UI
1. Run backend
2. Navigate to: `http://localhost:5000/swagger`

### HTTP File
1. Open `api-tests.http`
2. Click **Run** above any request

## 🔨 Build Commands

| Action | Shortcut |
|--------|----------|
| Build Solution | `Ctrl+Shift+B` |
| Clean Solution | Build → Clean Solution |
| Rebuild Solution | Build → Rebuild Solution |

## 📁 Solution Structure

```
OrchardAndVine.sln
├── OrchardAndVine.API (C#)
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   └── Program.cs
│
└── OrchardAndVine.Frontend (Node.js)
    ├── src/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## 💡 Useful Shortcuts

| Action | Shortcut |
|--------|----------|
| Solution Explorer | `Ctrl+Alt+L` |
| Go to Definition | `F12` |
| Find All References | `Shift+F12` |
| Quick Actions | `Ctrl+.` |
| Comment Code | `Ctrl+K, Ctrl+C` |
| Uncomment Code | `Ctrl+K, Ctrl+U` |
| Format Document | `Ctrl+K, Ctrl+D` |

## 🆘 Common Issues

### "Node.js tools not installed"
→ Install "Node.js development" workload via Visual Studio Installer

### "Cannot connect to database"
→ Check connection string in `appsettings.json`

### "Port already in use"
→ Stop all instances or change port in `launchSettings.json`

### "npm packages not restored"
→ Right-click `package.json` → Restore Packages

## 📚 Documentation

- [Full Visual Studio Guide](./VISUAL_STUDIO_SETUP.md)
- [.NET Quick Start](./DOTNET_QUICKSTART.md)
- [Backend Documentation](./DOTNET_BACKEND.md)
- [Main README](./README.md)

---

**Need help?** Check the detailed guides or open an issue on GitHub.
