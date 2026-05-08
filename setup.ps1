Write-Host "Setting up Finance RAG Platform..." -ForegroundColor Green

# Create directories
New-Item -ItemType Directory -Force -Path backend, docs, scripts | Out-Null

# Backend setup
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Set-Location backend
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools
# Note: install dependencies once requirements.txt is ready
Set-Location ..

# Frontend setup
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
if (Test-Path frontend) {
    Set-Location frontend
    npm install
    Set-Location ..
} else {
    Write-Host "Frontend directory missing or not initialized yet." -ForegroundColor Yellow
}

Write-Host "Setup complete! Please configure your .env file." -ForegroundColor Green
