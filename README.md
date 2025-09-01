# 🐾 Rescue Revolution - Pet Rescue Platform

A comprehensive web platform designed to connect pet lovers with animals in need. RescueRevolution serves as a bridge between rescue organizations, pet owners, and community members to facilitate pet adoption, lost pet recovery, and incident reporting.

## ✨ Features

- 🐕 **Pet Adoption Platform** - Browse and adopt pets in need of homes
- 🔍 **Lost & Found Database** - Report and search for lost pets in your area
- 🚨 **Incident Reporting** - Report animal abuse, emergencies, and welfare concerns
- 👤 **User Authentication** - Secure login and registration system
- 📊 **User Dashboard** - Personal dashboard to manage pets and track reports
- 📱 **Responsive Design** - Mobile-friendly interface for all devices
- 🔒 **Security Features** - Password hashing, session management, and CSRF protection
- 🌐 **Community Building** - Connect with other pet lovers and rescue organizations

## 🏗️ Tech Stack

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database management
- **Flask-Login** - User authentication
- **Werkzeug** - Security utilities
- **Gunicorn** - WSGI server for production

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Framer Motion** - Animation library
- **Vite** - Fast build tool

### Database
- **SQLite** - Development
- **PostgreSQL** - Production (Render)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rescue-revolution.git
   cd rescue-revolution
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:5173

## 🌐 Deployment on Render

### Automatic Deployment

1. **Connect your GitHub repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the `rescue-revolution` repository

2. **Configure the web service**
   - **Name**: `rescue-revolution`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Root Directory**: `backend`

3. **Set environment variables**
   ```
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgresql://user:password@host:port/database
   FLASK_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your application

### Manual Deployment

If you prefer manual deployment:

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy build files to backend**
   ```bash
   cp -r dist/* ../backend/static/
   ```

3. **Deploy to Render**
   - Follow the automatic deployment steps above

## 📁 Project Structure

```
rescue-revolution/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── models.py              # Database models
│   ├── routes.py              # API routes
│   ├── auth.py                # Authentication logic
│   ├── requirements.txt       # Python dependencies
│   └── static/                # Built frontend files
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Utility functions
│   │   └── types/            # TypeScript type definitions
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   └── vite.config.ts        # Vite configuration
├── .gitignore               # Git ignore file
└── README.md                # This file
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///rescue_revolution.db
FLASK_ENV=development
```

## 🗄️ Database Models

### User
- `id` - Primary key
- `username` - Unique username for login
- `email` - User's email address
- `password_hash` - Securely hashed password
- `created_at` - Account creation timestamp
- `is_admin` - Admin privileges flag

### Pet
- `id` - Primary key
- `name` - Pet's name
- `species` - Type of animal (dog, cat, etc.)
- `breed` - Specific breed information
- `age` - Pet's age in years
- `description` - Detailed pet description
- `image_url` - Link to pet's photo
- `status` - Current status (available, adopted, lost)
- `location` - Pet's location
- `contact_info` - Contact details for inquiries
- `created_at` - Listing creation timestamp
- `user_id` - Owner who listed the pet

### Incident
- `id` - Primary key
- `title` - Incident title/headline
- `description` - Detailed incident description
- `location` - Where the incident occurred
- `incident_type` - Type (lost_pet, found_pet, abuse, emergency)
- `contact_info` - Reporter's contact information
- `status` - Current status (open, resolved, closed)
- `created_at` - Report creation timestamp
- `user_id` - User who reported the incident

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Email**: support@rescuerevolution.com (if configured)
- **Community**: Join our pet rescue community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Community Impact

- 🏠 **Increased Pet Adoptions** - More pets find loving homes
- 🔍 **Faster Lost Pet Recovery** - Quicker reunification of pets and owners
- 🚨 **Improved Animal Welfare** - Faster response to abuse reports
- 🤝 **Stronger Community Bonds** - Pet lovers connect and collaborate

---

Made with ❤️ for animals in need
