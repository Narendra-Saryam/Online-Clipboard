# Local MongoDB Setup Guide

## Option 1: Install MongoDB Community Edition

1. **Download MongoDB Community Server**:
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows x64
   - Download and install

2. **Start MongoDB Service**:
   ```powershell
   # Start MongoDB service
   net start MongoDB
   ```

3. **Verify Installation**:
   ```powershell
   # Connect to MongoDB
   mongosh
   ```

## Option 2: Use Docker (if you have Docker installed)

1. **Pull and run MongoDB container**:
   ```powershell
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Verify it's running**:
   ```powershell
   docker ps
   ```

## Option 3: Use MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas account**:
   - Go to: https://www.mongodb.com/atlas
   - Create free cluster
   - Get connection string

2. **Update config.py**:
   - Replace the MONGO_URI with your Atlas connection string
   - Or set environment variable: `$env:MONGO_URI="your-atlas-connection-string"`

## Test the Connection

After setting up MongoDB, run:
```powershell
python app.py
```

The server should start without errors and show:
```
* Running on http://0.0.0.0:5000
```
