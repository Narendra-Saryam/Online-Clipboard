# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" and create an account
3. Choose the free tier (M0)

## Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Username: `clipboard`
4. Password: `clipboard123` (or your own secure password)
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Step 6: Update .env File
Replace the MONGO_URI in your .env file with the actual connection string:

```
MONGO_URI=mongodb+srv://clipboard:your_password@cluster0.xxxxx.mongodb.net/clipboard?retryWrites=true&w=majority
```

## Step 7: Test Connection
Run the Flask app and check the health endpoint:
```
http://localhost:5000/health
```

You should see: `{"status": "ok", "message": "Server is running", "database": "connected"}`
