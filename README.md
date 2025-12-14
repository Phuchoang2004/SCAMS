# ASE05 - SCAMS - Smart Campus System

Frontend for the Smart Campus System built with React, TypeScript, and Ant Design.

## Team Members

- Lê Thị Phương Thảo - 2252757
- Nghiêm Phạm Vỹ Nghi - 2252518
- Mai Hoàng Phúc - 2252635
- Lương Tấn Tài - 2353059
- Mai Thiện Ngôn - 2352819
  
## Getting Started

A modern, production-ready React TypeScript application with multi-layer architecture, featuring authentication, routing, state management, and a beautiful UI built with Ant Design.

## Features

### Core Features
- **Authentication System** - Complete login/logout with protected routes and email verification
- **Beautiful UI** - Ant Design components with custom theme tokens
- **Dark/Light Theme** - Toggle between themes with persistent storage
- **Responsive Layout** - Mobile-friendly design with collapsible sidebar
- **State Management** - React Query for server state + Context API for client state
- **Routing** - React Router with protected routes and navigation
- **TypeScript** - Full type safety throughout the application
- **Fast Development** - Vite for lightning-fast builds and HMR

### Architecture Layers
- **Config Layer** - Environment variables, theme tokens, and app configuration
- **Service Layer** - API client with interceptors and error handling
- **Hooks Layer** - Custom React hooks for data fetching and state management
- **Component Layer** - Reusable UI components organized by feature
- **Page Layer** - Route-specific page components
- **Context Layer** - Global state management with React Context
- **Error Handling** - Error boundaries and centralized error management

## Technology Stack

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Next generation frontend tooling
- **Ant Design 5** - Enterprise-class UI design language
- **TanStack Query** - Powerful data synchronization for React
- **React Router 6** - Declarative routing for React
- **js-cookie** - Simple cookie handling
- **Axios** - Promise-based HTTP client

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Phuchoang2004/SCAMS-Frontend.git
   cd SCAMS-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to configure your API endpoints and other settings.
   ``` bash
    # API Configuration
    VITE_API_BASE_URL=http://localhost:8000/api
    
    # Application Configuration
    VITE_APP_NAME=TypeScript Frontend Template
    
    # Environment
    NODE_ENV=development
   ```
4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Header, Sidebar, Footer)
│   ├── routing/        # Routing configuration
│   └── ui/             # Generic UI components
├── config/             # Configuration files
│   ├── env.ts          # Environment variables
│   ├── routes.ts       # Route constants
│   └── theme.ts        # Ant Design theme configuration
├── contexts/           # React Context providers
│   └── AppContext.tsx  # Global app state
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── profile/        # Profile page
│   └── settings/       # Settings page
├── services/           # API services
│   ├── api.ts          # HTTP client configuration
│   └── auth.ts         # Authentication service
├── types/              # TypeScript type definitions
│   ├── api.ts          # API-related types
│   ├── auth.ts         # Authentication types
│   └── common.ts       # Common types
├── utils/              # Utility functions
│   └── error.ts        # Error handling utilities
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Configuration

### Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Application Configuration
VITE_APP_NAME=Smart Campus System

# Environment
NODE_ENV=development
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_APP_NAME` | Application display name | `Smart Campus System` |
| `NODE_ENV` | Environment mode | `development` |

### Theme Customization
Edit `src/config/theme.ts` to customize colors, fonts, and other design tokens.

## Authentication

The application includes a complete authentication system:

- **Login/Logout** - Form-based authentication with validation
- **Email Verification** - Verify email before accessing the system
- **Protected Routes** - Automatic redirection for unauthorized users
- **Token Management** - Secure token storage and refresh
- **User Context** - Global user state management

## Deployment

### Build for Production
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
