#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm run install-frontend
npm run install-backend

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add MySQL database
railway add mysql

# Get database credentials
railway connect mysql

# Build applications
echo "Building applications..."
npm run build

# Deploy backend to Render
echo "Deploying backend to Render..."
render deploy

# Install Netlify CLI if not installed
npm install -g netlify-cli

# Deploy frontend to Netlify
echo "Deploying frontend to Netlify..."
cd frontend
netlify deploy --prod

# Run deployment script
./deploy.sh