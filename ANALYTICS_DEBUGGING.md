# Analytics Debugging Guide

## Quick Checklist

### 1. Environment Variables
Make sure your `.env` file is set up correctly:

**Frontend** (`.env`):
```
VITE_API_URL=https://mail.bcsapp.in
```

**Backend** (`backend/.env`):
```
FRONTEND_URL=https://fsmaster.in
PORT=5000
NODE_ENV=production
```

### 2. Browser Console Debugging

Open your browser's Developer Tools (F12) and check:

1. **Network Tab**:
   - Look for requests to `https://mail.bcsapp.in/api/analytics`
   - Check the response status code
   - Common issues:
     - `404` - Endpoint not found
     - `403` - CORS blocked
     - `500` - Server error

2. **Console Tab**:
   - Look for CORS errors
   - Check the full error message
   - Common CORS error: "Access to XMLHttpRequest at 'X' from origin 'Y' has been blocked by CORS policy"

### 3. Test the Backend Connection

Use `curl` or Postman to test if the backend is accessible:

```bash
# Test if backend is running
curl -v https://mail.bcsapp.in/api/health

# Test analytics endpoint (GET)
curl -v https://mail.bcsapp.in/api/analytics

# Test track-visit endpoint (POST)
curl -v -X POST https://mail.bcsapp.in/api/track-visit
```

### 4. Common Issues & Solutions

#### Issue 1: Certificate Error (HTTPS)
**Error**: SSL certificate error or untrusted certificate
**Solution**:
- Make sure your SSL certificate is valid
- If self-signed, you may need to disable cert verification for testing
- In development: `curl -k https://...` (ignore cert errors)

#### Issue 2: Port Not Accessible
**Error**: "Failed to fetch" with no CORS error
**Solution**:
- Verify port 5000 is open on your server
- Check firewall settings
- Run: `netstat -an | grep 5000` (on Linux/Mac) or `netstat -ano | findstr :5000` (Windows)

#### Issue 3: CORS Blocked
**Error**: "Access to XMLHttpRequest at 'X' has been blocked by CORS policy"
**Solution**:
- The backend CORS is now updated to accept requests from your frontend
- Make sure you restart the backend server after updating `server.js`
- Check that frontend URL matches one in the CORS allowed origins list

#### Issue 4: Analytics Endpoint Returns 404
**Error**: "404 Not Found"
**Solution**:
- Make sure `analyticsRouter.js` is imported in `server.js`
- Restart the backend server
- Check file paths in the import statement

### 5. Step-by-Step Testing

**1. Start Backend**:
```bash
cd backend
npm start
```
Expected output: `Server running on http://localhost:5000`

**2. Verify Backend is Running**:
- Open: `https://mail.bcsapp.in/api/health`
- Should see: `{"status":"ok","timestamp":"..."}`

**3. Start Frontend**:
```bash
npm run dev
```

**4. Open Browser DevTools**:
- Press F12
- Go to Network tab
- Reload page
- Look for requests to `/api/track-visit`
- Check response status and body

**5. Access Analytics**:
- Click 📊 button
- Enter password: `admin123`
- If still getting error, check console for details

### 6. Logs to Check

**Backend Console**:
- Any errors when server starts
- Any CORS-related messages
- Any errors when requests arrive

**Browser Console** (F12):
- Exact error messages
- Failed fetch details
- CORS policy violations

### 7. Advanced Debugging

If basic steps don't work, check:

1. **Is Node.js running the backend?**
   ```bash
   ps aux | grep node  # Linux/Mac
   tasklist | findstr node  # Windows
   ```

2. **Is the analytics router loaded?**
   Add a console.log in `backend/server.js`:
   ```javascript
   const analyticsRouter = require('./analyticsRouter');
   console.log('Analytics Router loaded');
   ```

3. **Check if API files exist**:
   - `backend/analyticsRouter.js` ✓
   - `backend/analytics.json` ✓
   - `backend/server.js` (has analytics router import) ✓

4. **Test with different origin**:
   If it works from `localhost` but not from `fsmaster.in`:
   - Check CORS allowedHeaders
   - Verify domain name resolves correctly
   - Check if there's a reverse proxy modifying headers

### 8. Production Deployment Checklist

- [ ] SSL certificate is valid (not self-signed)
- [ ] Firewall allows port 5000
- [ ] Environment variables are set correctly
- [ ] Backend is running as a service (not just in terminal)
- [ ] Analytics router is imported in server.js
- [ ] analytics.json file has write permissions
- [ ] Frontend .env has correct API_URL
- [ ] CORS origin list includes your frontend domain

### 9. Quick Restart Guide

If something's not working, try restarting both servers:

```bash
# Kill backend (if running in terminal)
# Press Ctrl+C in the backend terminal

# Restart backend
cd backend
npm start

# In another terminal, restart frontend
npm run dev

# Reload browser (Ctrl+R or Cmd+R)
```

## Need More Help?

Check these files for configuration:
- Frontend API config: `src/components/Analytics.jsx`
- Backend CORS: `backend/server.js`
- Environment variables: `.env` and `backend/.env`
- Analytics logic: `backend/analyticsRouter.js`
