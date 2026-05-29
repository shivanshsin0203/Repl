# Repl - Online Code Editor

![Next.js](https://img.shields.io/badge/Next.js-14-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Socket.IO](https://img.shields.io/badge/Socket.IO-ready-010101)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack online code editor built with Next.js 14, featuring a file tree, integrated terminal, and project management capabilities. Create, edit, and manage coding projects directly in your browser with real-time collaboration features.

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

- **Online Code Editor** - Full-featured code editor with syntax highlighting and file management
- **File Tree Navigation** - Browse and manage project files with an intuitive directory tree
- **Integrated Terminal** - Run commands directly in the browser using xterm.js
- **Project Management** - Create, open, and manage multiple coding projects
- **Authentication** - Secure user authentication via Kinde
- **Real-time Communication** - Socket.IO-powered real-time terminal and file updates
- **Framework Selection** - Choose between Node.js and React.js project templates
- **Recent Projects Dashboard** - Quickly access and reopen your recent projects

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 14.2.4 |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3.4.1 |
| Socket.IO Client | 4.7.5 |
| Kinde Auth | 2.2.13 |
| xterm.js | 5.5.0 |
| Ace Editor | 1.35.0 |
| Framer Motion | 11.2.10 |

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
│   ├── terminal.tsx
│   ├── loginpage.tsx
│   ├── loader.tsx
│   ├── sideGrid.tsx
│   └── ui/
├── utils/
│   ├── socket.ts
│   ├── portsContext.tsx
│   └── cn.ts
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Screenshots



> _Screenshots coming soon_

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- A **Kinde** account for authentication setup
- Access to a backend server (default: `http://35.154.131.67:3001`)

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivanshsin0203/Repl.git
   cd Repl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

> ⚠️ **Note:** No `.env.example` file was found in this repository. The following variables were inferred from the source code and may be incomplete or inaccurate. Please verify against the actual codebase.

| Variable | Description | Required |
|----------|-------------|----------|
| `KINDE_CLIENT_ID` | Kinde OAuth client ID | Yes |
| `KINDE_CLIENT_SECRET` | Kinde OAuth client secret | Yes |
| `KINDE_ISSUER_URL` | Kinde issuer URL | Yes |
| `NEXT_PUBLIC_KINDE_ISSUER_URL` | Public Kinde issuer URL | Yes |
| `KINDE_POST_LOGIN_REDIRECT_URL` | Redirect URL after login | Yes |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | Redirect URL after logout | Yes |

Create a `.env.local` file in the root directory and add the required variables.

## Running the Project

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## API Routes

### Authentication
- **`GET /api/auth/[kindeAuth]`** - Handles Kinde authentication (login, callback, logout)

### External API Endpoints (Backend Server)
The application communicates with a backend server at `http://35.154.131.67:3001`:

- **`POST /startproject`** - Creates or starts a new project
  - Body: `{ projectId, email, framework }`
  - Response: `{ ports: { port3002, port8000 } }`

- **`POST /getprojects`** - Retrieves user's projects
  - Body: `{ email }`
  - Response: Array of `{ projectId, framework, isActive, lastModified }`

- **`GET /filetree`** - Fetches the project file tree (via port3002)

### WebSocket Events
- **`terminal:write`** - Send terminal input to the server
- **`terminal:data`** - Receive terminal output from the server
- **`file:refresh`** - Trigger file tree refresh

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