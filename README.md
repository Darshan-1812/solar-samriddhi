# Solar Samriddhi - Solar Energy Calculator

A comprehensive solar energy calculation platform built with Next.js, helping users calculate solar panel requirements and energy generation for their location.

## 🌟 Features

- **Solar Calculator**: Accurate calculation of solar panels required and energy generation
- **Interactive Map**: Draw installation areas on satellite maps
- **Authentication System**: Complete user registration and login
- **Government Subsidies**: Information about solar subsidies and schemes
- **Responsive Design**: Works perfectly on all devices
- **Real-time Calculations**: Based on location and solar irradiance data

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Custom auth system with localStorage
- **Maps**: Leaflet.js for interactive mapping
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/solar-samriddhi.git
cd solar-samriddhi
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

### Demo Accounts:
- **Admin**: `darshangirase18@gmail.com` / `admin123`
- **Demo User**: `demo@solarsamriddhi.com` / `demo123`
- **Registration**: Create new accounts with any valid email

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Docker
\`\`\`bash
docker build -t solar-samriddhi .
docker run -p 3000:3000 solar-samriddhi
\`\`\`

### Manual Build
\`\`\`bash
npm run build
npm start
\`\`\`

## 📱 Pages

- **Home** (`/`) - Landing page with features
- **Dashboard** (`/dashboard`) - Solar calculation workflow
- **Profile** (`/profile`) - User profile management
- **Admin** (`/admin`) - Admin dashboard (admin only)
- **Auth** (`/auth/*`) - Login, register, forgot password

## 🛠️ Development

### Project Structure
\`\`\`
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility functions
├── public/             # Static assets
├── styles/             # Global styles
└── types/              # TypeScript types
\`\`\`

### Key Components
- `AuthProvider` - Authentication context
- `ProtectedRoute` - Route protection
- `SolarCalculator` - Main calculation logic
- `InteractiveMap` - Map drawing functionality

## 📊 Features Overview

### Solar Calculator
- Area-based calculations
- Weather data integration
- Energy consumption analysis
- Cost-benefit analysis

### Government Subsidies
- PM-Surya Ghar Yojana information
- State-wise subsidy details
- Application assistance

### User Management
- Registration and login
- Profile management
- Role-based access (Admin/User)
- Password reset functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: darshangirase18@gmail.com
- **Phone**: +91 93569 61167
- **Location**: Pune, Maharashtra

## 🙏 Acknowledgments

- Solar irradiance data from various meteorological sources
- Government subsidy information from official schemes
- Open source libraries and contributors
\`\`\`

```plaintext file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/

# OS
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache
