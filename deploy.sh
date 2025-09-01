#!/bin/bash

echo "🐾 Building Rescue Revolution for deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the frontend
echo "🔨 Building frontend..."
npm run build

# Navigate back to root
cd ..

# Create static directory in backend if it doesn't exist
mkdir -p backend/static

# Copy built files to backend static directory
echo "📁 Copying built files to backend..."
cp -r frontend/dist/* backend/static/

echo "✅ Build complete! Ready for deployment to Render."
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Render"
echo "3. Set environment variables in Render dashboard"
echo "4. Deploy!"
