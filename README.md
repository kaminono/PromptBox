# PromptBox

> A lightweight, privacy-first AI prompt management tool

A modern AI prompt management application built with Next.js 15, featuring local-first storage, version control, and an intuitive interface for organizing your AI prompts.

## ✨ Features

### Core Functionality
- 📝 **Prompt Management**: Create, edit, and organize AI prompts with rich text support
- 🏷️ **Smart Organization**: Flexible grouping system with tags and categories
- ⭐ **Favorites System**: Star your most-used prompts for quick access
- 🔍 **Advanced Search**: Full-text search with real-time filtering
- 📅 **Version History**: Automatic versioning with rollback capabilities
- 📤 **Import/Export**: JSON-based backup and migration system

### Privacy & Security
- 🔒 **100% Local Storage**: No servers, no cloud, no data tracking
- 🔐 **Privacy-First Design**: Your data never leaves your browser
- 📱 **Offline Ready**: Works completely offline after initial load

### User Experience
- 🎨 **Modern UI**: Clean, intuitive interface with professional design
- 🌙 **Dark Mode**: Full theme switching support
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🎬 **Smooth Animations**: Framer Motion-powered transitions
- ⚡ **Fast Performance**: Optimized bundle size and loading times

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Storage**: Browser LocalStorage
- **Icons**: Emoji + Custom SVG
- **Deployment**: Static Export Ready

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/kaminono/PromptBox.git
cd PromptBox

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

### Build & Deploy

```bash
# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Export static files (for static hosting)
npm run export
```

## 📁 Project Structure

```
PromptBox/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles and variables
│   ├── app/                     # Application routes
│   │   ├── layout.tsx          # App layout with navigation
│   │   ├── page.tsx            # Main prompt list
│   │   ├── create/             # Create new prompt
│   │   ├── edit/[id]/          # Edit existing prompt
│   │   └── prompt/[id]/        # View prompt details
│   ├── privacy/                 # Privacy policy
│   ├── terms/                   # Terms of service
│   └── feedback/                # Feedback page
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Modal.tsx           # Modal dialog component
│   │   ├── InputField.tsx      # Form input component
│   │   ├── TagSelector.tsx     # Tag selection component
│   │   └── Dropdown.tsx        # Dropdown menu component
│   ├── providers/               # Context providers
│   │   ├── ThemeProvider.tsx   # Theme and dark mode
│   │   └── ToastProvider.tsx   # Notification system
│   ├── Header.tsx              # Landing page header
│   ├── Footer.tsx              # Landing page footer
│   ├── AppHeader.tsx           # App navigation header
│   ├── AppFooter.tsx           # App footer
│   ├── PromptCard.tsx          # Prompt display card
│   └── PromptForm.tsx          # Prompt creation/editing form
├── hooks/                       # Custom React hooks
│   └── usePromptForm.ts        # Form state management
├── lib/                         # Utility functions
│   ├── storage.ts              # LocalStorage operations
│   ├── animations.ts           # Animation configurations
│   └── constants.ts            # App constants
├── types/                       # TypeScript definitions
│   ├── prompt.ts               # Prompt-related types
│   ├── group.ts                # Group/category types
│   └── index.ts                # Type exports
└── tailwind.config.ts          # Tailwind CSS configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (`#4F46E5`) - Main brand color
- **Secondary**: Emerald (`#10B981`) - Accent and success states
- **Neutral**: Gray scale for backgrounds and text
- **Dark Mode**: Optimized contrast ratios

### Animation System
- **Page Transitions**: Smooth fade and slide animations
- **Component States**: Hover, focus, and loading states
- **Micro-interactions**: Button clicks, form submissions
- **Performance**: Optimized with `transform` and `opacity`

## 📊 Performance Metrics

### Build Output
```
Route (app)                           Size     First Load JS
┌ ○ /                              4.13 kB         145 kB
├ ○ /app                           3.78 kB         149 kB
├ ○ /app/create                      763 B         147 kB
├ ƒ /app/edit/[id]                  2.2 kB         149 kB
├ ƒ /app/prompt/[id]               4.26 kB         149 kB
├ ○ /feedback                        141 B         101 kB
├ ○ /privacy                         141 B         101 kB
└ ○ /terms                           141 B         101 kB
+ First Load JS shared by all             101 kB
```

### Features
- ✅ **Zero Dependencies** for core functionality
- ✅ **Client-Side Rendering** for privacy
- ✅ **Optimized Bundle** with code splitting
- ✅ **SEO Ready** with meta tags and structured data

## 🧪 Development

### Adding New Features

1. **New Pages**: Create route folders in `app/` directory
2. **Components**: Add to `components/` with TypeScript interfaces
3. **Styling**: Use Tailwind utility classes with custom design tokens
4. **State**: Leverage LocalStorage through `lib/storage.ts`

### Code Quality

```bash
npm run type-check    # TypeScript validation
npm run lint          # ESLint code quality
npm run build         # Production build test
```

### Environment Validation

✅ **Node.js**: v22.14.0+  
✅ **npm**: v10.9.2+  
✅ **Dependencies**: 396 packages installed  
✅ **TypeScript**: Strict mode enabled  
✅ **Build**: Production ready  
✅ **Development**: Hot reload enabled  

## 🔧 Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Create production build
npm start            # Start production server
npm run type-check   # Run TypeScript compiler check
npm run lint         # Run ESLint code analysis
npm run export       # Export static files for hosting
```

## 🌐 Deployment

### Static Hosting (Recommended)
- **Vercel**: One-click deployment from GitHub
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Use `npm run export` for static files

### Self-Hosting
- **Docker**: Create container with Node.js runtime
- **VPS**: Standard Node.js hosting setup

## 🔒 Privacy Philosophy

PromptBox is built with privacy as a core principle:

- **No Data Collection**: Zero telemetry or analytics
- **Local-First**: All data stored in browser LocalStorage
- **No Accounts**: No sign-up, login, or user tracking
- **Transparent**: Open source and auditable code
- **Secure**: No external API calls or data transmission

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Reporting Issues
- 🐛 **Bug Reports**: Use GitHub Issues
- 💡 **Feature Requests**: Describe use cases
- 📝 **Documentation**: Help improve clarity

## 🚀 Roadmap

- [ ] **Custom Themes**: User-defined color schemes
- [ ] **Advanced Search**: Regular expressions and filters
- [ ] **Batch Operations**: Multi-select actions
- [ ] **Template Library**: Pre-built prompt templates
- [ ] **Keyboard Shortcuts**: Power user features
- [ ] **PWA Support**: Installable web app

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for smooth animations
- **Community** for feedback and contributions

---

**Made with ❤️ by independent developers**  
*Your prompts, your privacy, your control.* 