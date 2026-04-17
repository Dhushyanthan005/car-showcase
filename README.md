# Car Showcase - Full Stack Application

This is a full-stack web application for showcasing and managing cars. The project is organized into frontend and backend directories.

## Project Structure

```
car-showcase/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js + Express backend API
│   ├── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with hot reload (uses nodemon)
- `npm start` - Start production server

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- JavaScript (JSX)

### Backend
- Node.js
- Express
- CORS

## Git Workflow

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "Your commit message"
```

3. Push to remote:
```bash
git push origin feature/your-feature-name
```

4. Create a pull request on GitHub

## Contributing

When working on this project:
1. Always create a feature branch
2. Make sure both frontend and backend are functioning
3. Test your changes before committing
4. Keep commits descriptive and focused

## License

ISC
