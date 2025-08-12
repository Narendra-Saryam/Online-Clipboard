# 🚀 Deployment Guide

This guide will help you deploy your Online Clipboard application to the internet using Netlify (frontend) and Render (backend).

## 📋 Prerequisites

1. **GitHub Account** - To host your code
2. **Netlify Account** - For frontend hosting (free)
3. **Render Account** - For backend hosting (free tier available)

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Your Code
1. Push your code to GitHub
2. Make sure your `server/` folder contains:
   - `app.py` (main Flask application)
   - `requirements.txt` (Python dependencies)
   - `config.py` (configuration)
   - `build.sh` (build script)

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `online-clipboard-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

5. Click "Create Web Service"
6. Wait for deployment (usually 2-3 minutes)
7. Copy your service URL (e.g., `https://your-app.onrender.com`)

### Step 3: Update Frontend Configuration
1. Go to your frontend code
2. Update `client/src/config.js`:
   ```javascript
   production: {
     API_BASE_URL: 'https://your-app.onrender.com'  // Your Render URL
   }
   ```

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare Your Code
1. Make sure your `client/` folder is ready
2. Update the API URL in `config.js` with your Render backend URL

### Step 2: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure the build:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. Click "Deploy site"
6. Wait for deployment (usually 1-2 minutes)
7. Your site will be available at `https://your-site.netlify.app`

## 🔗 Environment Variables (Optional)

### For Frontend (Netlify)
1. Go to Site settings → Environment variables
2. Add: `REACT_APP_API_URL` = `https://your-render-app.onrender.com`

### For Backend (Render)
1. Go to your service → Environment
2. Add any environment variables you need

## ✅ Testing Your Deployment

1. **Test Backend**: Visit `https://your-render-app.onrender.com/health`
2. **Test Frontend**: Visit your Netlify URL
3. **Test Full Flow**:
   - Share text from one device
   - Retrieve it from another device using the code

## 🌍 Benefits After Deployment

✅ **Global Access**: Works from anywhere on the internet  
✅ **No Local Setup**: No need to run servers locally  
✅ **Automatic Updates**: Deployments happen automatically  
✅ **Free Hosting**: Both services offer free tiers  
✅ **HTTPS**: Secure connections by default  

## 🚨 Important Notes

- **Free Tier Limitations**: 
  - Render: Services sleep after 15 minutes of inactivity
  - Netlify: 100GB bandwidth/month
- **File Storage**: Files are stored on Render's servers (temporary)
- **Data Persistence**: JSON data is stored on Render's file system

## 🔧 Troubleshooting

### Backend Issues
- Check Render logs for errors
- Ensure all dependencies are in `requirements.txt`
- Verify the start command is correct

### Frontend Issues
- Check Netlify build logs
- Ensure API URL is correct
- Test API endpoints directly

### CORS Issues
- Backend already has CORS configured
- If issues persist, check Render's CORS settings

## 🎉 Success!

Once deployed, your Online Clipboard will be accessible worldwide at your Netlify URL!
