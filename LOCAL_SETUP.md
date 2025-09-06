# 🏠 Local Development Setup - Rescue Revolution

This guide will help you run the Rescue Revolution application locally on your machine.

## 📋 Prerequisites

- **Python 3.8+** installed
- **Node.js 16+** installed
- **Git** installed

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/rescue-revolution.git
cd rescue-revolution

# Setup backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements-local.txt
```

### 2. Environment Variables

The `.env` file is already created with:
```env
SECRET_KEY=dev-secret-key-change-in-production-local-development
DATABASE_URL=sqlite:///rescue_revolution.db
FLASK_ENV=development
```

### 3. Build Frontend

```bash
cd ../frontend
npm install
npm run build
```

### 4. Run the Application

```bash
cd ../backend
python app.py
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:5000/api

## 📁 Project Structure

```
rescue-revolution/
├── backend/
│   ├── app.py                 # Flask application
│   ├── requirements.txt       # Production dependencies
│   ├── requirements-local.txt # Local development dependencies
│   ├── .env                  # Environment variables
│   ├── venv/                 # Virtual environment
│   └── static/               # Built frontend files
├── frontend/
│   ├── src/                  # React source code
│   ├── dist/                 # Built frontend
│   └── package.json          # Node.js dependencies
└── README.md
```

## 🔧 Development Commands

### Backend
```bash
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements-local.txt

# Run Flask app
python app.py
```

### Frontend
```bash
# Install dependencies
npm install

# Development server (if needed)
npm run dev

# Build for production
npm run build
```

## 🗄️ Database

The application uses SQLite for local development:
- **File**: `rescue_revolution.db` (created automatically)
- **Location**: `backend/` directory
- **Tables**: Users, Pets, Incidents (created automatically)

## 🚨 Troubleshooting

### Common Issues:

1. **Port already in use**:
   ```bash
   # Kill process using port 5000
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **Module not found**:
   ```bash
   # Make sure virtual environment is activated
   venv\Scripts\activate
   pip install -r requirements-local.txt
   ```

3. **Frontend build errors**:
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

## 🎯 Next Steps

1. **Test the application** by visiting http://localhost:5000
2. **Register a user account**
3. **Add some pets** for adoption
4. **Report incidents**
5. **Deploy to Render** when ready

## 📞 Support

If you encounter any issues:
1. Check the console output for error messages
2. Verify all dependencies are installed
3. Ensure virtual environment is activated
4. Check that ports 5000 and 5173 are available
