# Website Analytics Setup Guide

## Overview
Your website now has a complete analytics system that tracks:
- **Website Visits**: Total, weekly, and monthly visitor counts
- **CV Downloads**: Total, weekly, and monthly download counts

## Features Implemented

### Backend
- **Analytics Router** (`backend/analyticsRouter.js`)
  - `/api/track-visit` - POST endpoint to record website visits
  - `/api/track-download` - POST endpoint to record CV downloads
  - `/api/analytics` - GET endpoint to retrieve analytics data
  - `/api/analytics/reset` - POST endpoint to reset all analytics data

### Frontend
- **Analytics Component** (`src/components/Analytics.jsx`)
  - Admin-only dashboard with password protection
  - Displays total, weekly, and monthly statistics
  - Shows historical data (last 12 weeks and 12 months)
  - Refresh and reset functionality

- **Tracking Integration**
  - Automatic visit tracking when the website loads
  - CV download tracking (via the 📥 button in Navigation)

### Data Storage
- **Analytics Data** (`backend/analytics.json`)
  - JSON file-based storage for simplicity
  - Organized by visits and CV downloads
  - Weekly and monthly breakdown

## How to Use

### Access Analytics Dashboard
1. Click the 📊 button in the navigation bar
2. Enter the admin password (default: `admin123`)
3. View your analytics statistics

### Change Admin Password
Edit `src/components/Analytics.jsx` and change this line:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password
```

### View Data Structure
The analytics data is stored in `backend/analytics.json` in this format:
```json
{
  "visits": {
    "total": 0,
    "weekly": [
      { "week": "2024-01-01", "count": 10 },
      { "week": "2024-01-08", "count": 15 }
    ],
    "monthly": [
      { "month": "2024-01", "count": 50 }
    ]
  },
  "cvDownloads": {
    "total": 0,
    "weekly": [],
    "monthly": []
  }
}
```

## Setup Instructions

### 1. Backend Configuration
No additional setup needed! The analytics router is already integrated in `backend/server.js`.

### 2. Frontend Configuration (Optional)
If your API URL is different from `http://localhost:5000`, update your `.env` file:
```
VITE_API_URL=http://your-backend-url:5000
```

### 3. Start Your Servers

**Backend:**
```bash
cd backend
npm start
# or for development
npm run dev
```

**Frontend:**
```bash
npm run dev
```

## How Tracking Works

### Visit Tracking
- Automatically sends a POST request to `/api/track-visit` when the app loads
- Records the visit in the JSON file
- Counts it for the current week and month

### Download Tracking
- When users click the 📥 CV download button, a POST request is sent to `/api/track-download`
- Then the CV file is downloaded
- Statistics are updated in real-time

## Statistics Breakdown

### Weekly Stats
- Tracked by week start date (Monday)
- Last 12 weeks of data shown in dashboard

### Monthly Stats
- Tracked by month (YYYY-MM format)
- Last 12 months of data shown in dashboard

### Current Data
- "This Week" shows the latest week's count
- "This Month" shows the latest month's count

## Features

✅ Real-time tracking
✅ Weekly and monthly breakdown
✅ Historical data retention
✅ Admin-only dashboard
✅ Password protected
✅ Refresh functionality
✅ Reset functionality
✅ Responsive design
✅ Dark/Light mode compatible

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
1. Change the default admin password (`admin123`)
2. Consider adding proper authentication/session management
3. Add SSL/HTTPS for secure data transmission
4. Implement rate limiting on tracking endpoints
5. Add authentication middleware before deploying

### Suggested Enhancement for Production:
Replace the simple password check with proper authentication:
```javascript
// Instead of simple password, use JWT tokens or sessions
router.get('/analytics', authenticateAdmin, (req, res) => {
  // ... implementation
});
```

## Troubleshooting

### Analytics button not showing
- Make sure `Analytics.jsx` is imported in `App.jsx`
- Check that the analytics route is added to App.jsx

### Tracking not working
- Verify backend is running on the correct port
- Check browser console for errors
- Ensure `VITE_API_URL` is correctly set if using a different backend URL

### Data not saving
- Check that `backend/analytics.json` exists and is writable
- Verify Node.js has write permissions to the backend folder
- Check server logs for errors

## API Endpoints Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/track-visit` | POST | Record a website visit |
| `/api/track-download` | POST | Record a CV download |
| `/api/analytics` | GET | Get analytics data |
| `/api/analytics/reset` | POST | Reset all analytics |

## Next Steps

1. ✅ Test the analytics system locally
2. ✅ Change the admin password for security
3. ✅ Customize the styling if needed (`src/styles/Analytics.css`)
4. ✅ Deploy to production with proper security measures
5. ✅ Monitor and review analytics regularly

## Support

For issues or questions about the analytics implementation, check:
- Browser console for frontend errors
- Server console for backend errors
- `backend/analytics.json` for data validation
