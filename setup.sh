#!/usr/bin/env bash
set -e

echo "Setting up Finance RAG Platform..."

# Create frontend and backend if not existing
mkdir -p backend docs scripts

# Backend setup
echo "Setting up Backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -U pip setuptools
# Note: we will install dependencies here once requirements.txt is ready
# pip install -r requirements.txt
cd ..

# Frontend setup
echo "Setting up Frontend..."
if [ ! -d "frontend" ]; then
    echo "Frontend directory missing or not initialized yet."
else
    cd frontend
    npm install
    cd ..
fi

echo "Setup complete! Please configure your .env file."
