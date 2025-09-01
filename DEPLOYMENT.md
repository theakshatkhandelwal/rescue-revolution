# 🚀 Deployment Guide - Rescue Revolution

This guide will help you deploy the Rescue Revolution pet rescue platform to Render and set up local development.

## 📋 Prerequisites

- **Git** installed on your machine
- **GitHub account** for repository hosting
- **Render account** for deployment
- **Python 3.8+** for backend
- **Node.js 16+** for frontend

## 🏠 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rescue-revolution.git
cd rescue-revolution
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo SECRET_KEY=your-secret-key-here > .env
echo DATABASE_URL=sqlite:///rescue_revolution.db >> .env
echo FLASK_ENV=development >> .env

# Run the Flask application
python app.py
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🌐 Render Deployment

### 1. Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Rescue Revolution platform"
   git push origin main
   ```

2. **Build the frontend for production:**
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

### 2. Connect to Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub account** (if not already connected)
4. **Select the `rescue-revolution` repository**

### 3. Configure the Web Service

**Basic Settings:**
- **Name**: `rescue-revolution`
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy Settings:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Root Directory**: `backend`

### 4. Environment Variables

Add these environment variables in the Render dashboard:

```
SECRET_KEY=your-super-secret-key-here-make-it-long-and-random
DATABASE_URL=postgresql://user:password@host:port/database
FLASK_ENV=production
```

**Note:** Render will automatically provide a PostgreSQL database URL when you create a PostgreSQL service.

### 5. Create PostgreSQL Database (Optional but Recommended)

1. **Go to Render Dashboard**
2. **Click "New +" → "PostgreSQL"**
3. **Configure:**
   - **Name**: `rescue-revolution-db`
   - **Database**: `rescue_revolution`
   - **User**: `rescue_user`
4. **Copy the provided DATABASE_URL**
5. **Add it to your web service environment variables**

### 6. Deploy

1. **Click "Create Web Service"**
2. **Wait for the build to complete** (usually 2-5 minutes)
3. **Your app will be available at the provided URL**

## 🔧 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECRET_KEY` | Flask secret key for sessions | Yes | None |
| `DATABASE_URL` | Database connection string | Yes | SQLite |
| `FLASK_ENV` | Flask environment | No | development |
| `PORT` | Application port | No | Auto-detected |

## 📊 Database Setup

The application will automatically create the database tables on first run. If you need to reset the database:

```bash
# Remove existing database
rm backend/rescue_revolution.db

# Restart the application
python app.py
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails on Render:**
   - Check that all dependencies are in `requirements.txt`
   - Ensure `gunicorn` is listed in requirements
   - Verify the root directory is set to `backend`

2. **Database connection errors:**
   - Verify the `DATABASE_URL` environment variable
   - Check that PostgreSQL service is running
   - Ensure database credentials are correct

3. **Frontend not loading:**
   - Verify the build completed successfully
   - Check that static files are in `backend/static/`
   - Ensure the Flask app is serving static files correctly

4. **Authentication issues:**
   - Verify `SECRET_KEY` is set
   - Check that cookies are enabled
   - Ensure CORS is properly configured

### Debug Mode

For local debugging, you can enable debug mode:

```bash
# In backend/.env
FLASK_ENV=development
FLASK_DEBUG=1
```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones
- All modern browsers (Chrome, Firefox, Safari, Edge)

## 🔒 Security Considerations

1. **Never commit sensitive data:**
   - Keep `.env` files out of version control
   - Use environment variables for secrets
   - Rotate SECRET_KEY regularly

2. **Production checklist:**
   - ✅ HTTPS enabled (automatic on Render)
   - ✅ Secure headers configured
   - ✅ CORS properly set up
   - ✅ Database connection secured
   - ✅ Error handling implemented

## 📈 Monitoring & Analytics

Render provides:
- **Build logs** for deployment debugging
- **Application logs** for runtime issues
- **Performance metrics** for optimization
- **Uptime monitoring** for reliability

## 🚀 Next Steps

After successful deployment:

1. **Test all features:**
   - User registration and login
   - Pet listing and search
   - Incident reporting
   - Contact functionality

2. **Set up monitoring:**
   - Configure error tracking
   - Set up performance monitoring
   - Enable user analytics

3. **Scale as needed:**
   - Upgrade Render plan for more resources
   - Add CDN for static assets
   - Implement caching strategies

## 📞 Support

If you encounter issues:

1. **Check the logs** in Render dashboard
2. **Review this deployment guide**
3. **Check the README.md** for general information
4. **Open an issue** on GitHub for bugs
5. **Contact support** for Render-specific issues

---

**Happy Deploying! 🐾**

Your Rescue Revolution platform is now ready to help animals in need!
