# SafeKids APLV

> A comprehensive barcode scanning application designed to help parents and caregivers safely manage dietary restrictions for children with cow's milk protein allergies (APLV).

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.0-green?logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 📱 Features

- **📷 Barcode Scanner**: Real-time product barcode scanning using camera integration
- **⚡ Instant Results**: Get immediate ingredient verification and APLV safety status
- **🔍 Product Search**: Browse and search our database of verified products
- **💾 Safe Products List**: Save and access a personalized list of approved products
- **📊 Detailed Ingredients**: View complete ingredient lists with risk highlighting
- **📱 Mobile First**: Fully responsive design optimized for all devices
- **🔒 Privacy First**: All data processing respects user privacy

## 🚀 Live Demo

- **Frontend**: [https://aplv-project-ptwomj9b2-emmas-projects-cc952695.vercel.app/](https://aplv-project-ptwomj9b2-emmas-projects-cc952695.vercel.app/)
- **Status**: Production Ready ✅

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm or yarn package manager
- Git
- (Optional) Docker for containerized development

### Quick Start

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/safekids-aplv.git
cd safekids-aplv
\`\`\`

2. **Install dependencies**

\`\`\`bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
\`\`\`

3. **Start development servers**

\`\`\`bash
# Terminal 1 - Backend (port 4000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
\`\`\`

4. **Open in browser**

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Installation

### Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000
EOF

# Start development server
npm run dev
\`\`\`

### Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=4000
NODE_ENV=development
EOF

# Start development server
npm run dev
\`\`\`

## 📁 Project Structure

\`\`\`
safekids-aplv/
├── frontend/                          # Next.js React application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── scan/
│   │   │   │   └── page.tsx          # Barcode scanner page
│   │   │   ├── search/
│   │   │   │   └── page.tsx          # Product search page
│   │   │   ├── safe-list/
│   │   │   │   └── page.tsx          # Saved products page
│   │   │   ├── profile/
│   │   │   │   └── page.tsx          # User profile page
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── globals.css           # Global styles
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── responsive-nav.tsx
│   │   │   │   ├── root-layout-client.tsx
│   │   │   │   └── logo.tsx
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   └── aplv/
│   │   │       └── barcode-scanner.tsx
│   │   └── lib/
│   │       └── utils.ts
│   ├── public/                        # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── backend/                           # Express.js API server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── products.ts           # Product endpoints
│   │   │   ├── search.ts             # Search endpoints
│   │   │   └── version.ts            # Health check
│   │   ├── middleware/
│   │   ├── models/
│   │   └── index.ts                  # Main app file
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── .gitignore
└── README.md
\`\`\`

## 💻 Development

### Available Scripts

#### Frontend

\`\`\`bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
\`\`\`

#### Backend

\`\`\`bash
cd backend

# Start development server
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
\`\`\`

### Code Style

This project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

### Making Changes

1. Create a feature branch: \`git checkout -b feature/your-feature\`
2. Make your changes
3. Commit: \`git commit -am 'Add feature'\`
4. Push: \`git push origin feature/your-feature\`
5. Open a Pull Request

## 🌐 Deployment

### Deploy Frontend to Vercel

1. **Connect to Vercel**

\`\`\`bash
# Push to GitHub first
git push origin main
\`\`\`

2. **Import in Vercel Dashboard**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Set Root Directory to \`frontend\`
   - Add environment variables:
     \`\`\`
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     \`\`\`
   - Deploy

3. **Verify Deployment**
   \`\`\`bash
   # Your app will be available at
   # https://safekids-aplv.vercel.app
   \`\`\`

### Deploy Backend to Railway

1. **Setup Railway Account**
   - Go to [https://railway.app](https://railway.app)
   - Connect your GitHub account

2. **Create New Service**
   - New Project → Deploy from GitHub
   - Select your repository
   - Root Directory: \`backend\`

3. **Configure Environment**
   - Add PORT variable: \`4000\`
   - Add NODE_ENV variable: \`production\`

4. **Get your Backend URL**
   - Copy the generated Railway URL
   - Update frontend environment variable: \`NEXT_PUBLIC_API_URL\`

### Docker Deployment

\`\`\`bash
# Build frontend image
cd frontend
docker build -t safekids-frontend .

# Build backend image
cd backend
docker build -t safekids-backend .

# Run containers
docker run -p 3000:3000 safekids-frontend
docker run -p 4000:4000 safekids-backend
\`\`\`

## 🛠 Technology Stack

### Frontend
- **Next.js 16.0** - React framework with built-in optimization
- **React 19.2** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **@zxing/browser** - Barcode scanning

### Backend
- **Express.js** - Minimal web framework
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **Node.js 18+** - JavaScript runtime

### Tools & Services
- **Git & GitHub** - Version control
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting
- **npm** - Package management

## 📡 API Documentation

### Health Check

\`\`\`bash
GET /version
\`\`\`

**Response:**
\`\`\`json
{
  "version": "1.0.0",
  "status": "ok"
}
\`\`\`

### Get Products

\`\`\`bash
GET /api/products?safe=true
\`\`\`

**Query Parameters:**
- \`safe\` (boolean) - Filter safe products
- \`query\` (string) - Search by name or brand

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "name": "Almond Milk",
    "brand": "Alpro",
    "category": "Plant-based Beverage",
    "isSafe": true
  }
]
\`\`\`

### Get Product by Barcode

\`\`\`bash
GET /api/products/barcode/:barcode
\`\`\`

**Response:**
\`\`\`json
{
  "id": 1,
  "name": "Almond Milk",
  "brand": "Alpro",
  "barcode": "8718345030255",
  "isSafe": true,
  "riskyIngredients": [],
  "allIngredients": ["water", "almonds", "salt"]
}
\`\`\`

### Scan Product

\`\`\`bash
POST /api/scan
Content-Type: application/json

{
  "barcode": "8718345030255"
}
\`\`\`

**Response:**
\`\`\`json
{
  "productName": "Almond Milk",
  "isSafe": true,
  "riskyIngredients": [],
  "allIngredients": ["water", "almonds", "salt"]
}
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Development Guidelines

- Write clear commit messages
- Add comments for complex logic
- Test your changes locally
- Update documentation as needed
- Follow the existing code style

## 🐛 Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MissWtson** - Full-stack developer in Chile
- Location: Chile 🇨🇱
- Tech Stack: Next.js, React, TypeScript, Express.js

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [ZXing](https://github.com/zxing-js/library) - Barcode scanning library

## 📧 Contact & Support

For questions or support:
- 📧 Email: [elinares235@gmail.com.com]

---

**SafeKids APLV** - Making safe food choices easier for families. ❤️

*Last updated: December 2025*