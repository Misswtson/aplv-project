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

- **Frontend**: [https://safekids-aplv.vercel.app/](https://safekids-aplv.vercel.app/)
- **Status**: Production Ready ✅

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
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

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

### Code Style

This project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

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
- 📧 Email: [elinares235@gmail.com]

---

**SafeKids APLV** - Making safe food choices easier for families. ❤️

*Last updated: December 2025*