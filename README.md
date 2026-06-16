# Repl - Online Code Editor

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Next.js](https://img.shields.io/badge/Next.js-14.2.4-000000)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7.5-010101)
![License](https://img.shields.io/badge/License-MIT-yellow)

A fullstack online code editor and execution environment built with Next.js (App Router) and TypeScript. Create, edit, and run code projects directly in your browser with real-time collaboration features.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Online Code Editor** - Full-featured code editor with syntax highlighting and file tree navigation
- **Multiple Framework Support** - Create projects with Node.js or React.js
- **Real-time Terminal** - Integrated terminal emulator with WebSocket communication
- **File Management** - Browse, create, and edit files through an intuitive file tree interface
- **User Authentication** - Secure authentication via Kinde
- **Project Dashboard** - View and manage your recent projects
- **Responsive UI** - Modern, dark-themed interface with smooth animations

## Tech Stack

**Frontend:**
- Next.js 14.2.4 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3.4
- Framer Motion 11.2
- Ace Editor (via react-ace)
- xterm.js 5.5

**Backend:**
- Next.js API Routes
- Socket.io Client 4.7.5

**Authentication:**
- Kinde Auth Next.js 2.2.13

**Other:**
- Axios 1.7.2
- Tabler Icons React 3.6

## Project Structure

```
Repl/
├── app/
│   ├── api/
│   │   └── auth/[kindeAuth]/
│   │       └── route.js
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── filetress.tsx
│   ├── header.tsx
│   ├── loader.tsx
│   ├── loginpage.tsx
│   ├── sideGrid.tsx
│   └── terminal.tsx
├── utils/
│   ├── portsContext.tsx
│   └── socket.ts
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Screenshots

<!-- Add screenshots of your application here -->

> _Screenshots coming soon_

## Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)
- A Kinde account for authentication setup

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivanshsin0203/Repl.git
   cd Repl
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

> ⚠️ **Note:** No `.env.example` file was found in this repository. The following variables were inferred from the source code and may be incomplete or inaccurate. Please verify against the actual codebase.

Create a `.env.local` file in the root directory with the following variables:

```env
# Kinde Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000
```

## Running the Project

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint the codebase
npm run lint
```

The development server will start at `http://localhost:3000`.

## API Routes

### Authentication Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[kindeAuth]` | GET | Handles Kinde authentication (login, callback, logout) |

### External API Endpoints (Backend Server)

The application communicates with an external backend server at `http://35.154.131.67:3001`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/startproject` | POST | Creates or starts a new project |
| `/getprojects` | POST | Retrieves user's projects |
| `/:port/filetree` | GET | Fetches the file tree for a project |

### WebSocket Events

The application uses Socket.io for real-time communication:

| Event | Direction | Description |
|-------|-----------|-------------|
| `terminal:write` | Client → Server | Sends terminal input |
| `terminal:data` | Server → Client | Receives terminal output |
| `file:refresh` | Server → Client | Triggers file tree refresh |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.