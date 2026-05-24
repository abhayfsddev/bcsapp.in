/**
 * Analytics Router
 * Handles tracking website visits and CV downloads
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ANALYTICS_FILE = path.join(__dirname, 'analytics.json');

// Initialize analytics file if it doesn't exist
const initAnalyticsFile = () => {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    const initialData = {
      visits: {
        total: 0,
        weekly: [],
        monthly: [],
        lastReset: new Date().toISOString()
      },
      cvDownloads: {
        total: 0,
        weekly: [],
        monthly: [],
        lastReset: new Date().toISOString()
      }
    };
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(initialData, null, 2));
  }
};

// Get analytics data
const getAnalyticsData = () => {
  initAnalyticsFile();
  const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
  return JSON.parse(data);
};

// Save analytics data
const saveAnalyticsData = (data) => {
  fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
};

// Get current week and month
const getCurrentWeek = () => {
  const date = new Date();
  const startDate = new Date(date.setDate(date.getDate() - date.getDay()));
  return startDate.toISOString().split('T')[0];
};

const getCurrentMonth = () => {
  const date = new Date();
  return date.toISOString().slice(0, 7); // YYYY-MM format
};

// Update statistics
const updateStats = (data, type) => {
  const week = getCurrentWeek();
  const month = getCurrentMonth();

  if (type === 'visit') {
    data.visits.total += 1;
    
    // Weekly
    const weekRecord = data.visits.weekly.find(w => w.week === week);
    if (weekRecord) {
      weekRecord.count += 1;
    } else {
      data.visits.weekly.push({ week, count: 1 });
    }
    
    // Monthly
    const monthRecord = data.visits.monthly.find(m => m.month === month);
    if (monthRecord) {
      monthRecord.count += 1;
    } else {
      data.visits.monthly.push({ month, count: 1 });
    }
  } else if (type === 'download') {
    data.cvDownloads.total += 1;
    
    // Weekly
    const weekRecord = data.cvDownloads.weekly.find(w => w.week === week);
    if (weekRecord) {
      weekRecord.count += 1;
    } else {
      data.cvDownloads.weekly.push({ week, count: 1 });
    }
    
    // Monthly
    const monthRecord = data.cvDownloads.monthly.find(m => m.month === month);
    if (monthRecord) {
      monthRecord.count += 1;
    } else {
      data.cvDownloads.monthly.push({ month, count: 1 });
    }
  }

  return data;
};

// Track visit
router.post('/track-visit', (req, res) => {
  try {
    let data = getAnalyticsData();
    data = updateStats(data, 'visit');
    saveAnalyticsData(data);
    
    res.json({ 
      success: true, 
      message: 'Visit tracked',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ success: false, message: 'Error tracking visit' });
  }
});

// Track CV download
router.post('/track-download', (req, res) => {
  try {
    let data = getAnalyticsData();
    data = updateStats(data, 'download');
    saveAnalyticsData(data);
    
    res.json({ 
      success: true, 
      message: 'Download tracked',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    res.status(500).json({ success: false, message: 'Error tracking download' });
  }
});

// Get analytics (admin only - in production, add authentication)
router.get('/analytics', (req, res) => {
  try {
    const data = getAnalyticsData();
    
    // Get latest week and month
    const latestWeek = data.visits.weekly.length > 0 
      ? data.visits.weekly[data.visits.weekly.length - 1].count 
      : 0;
    
    const latestMonth = data.visits.monthly.length > 0 
      ? data.visits.monthly[data.visits.monthly.length - 1].count 
      : 0;
    
    const latestCVWeek = data.cvDownloads.weekly.length > 0 
      ? data.cvDownloads.weekly[data.cvDownloads.weekly.length - 1].count 
      : 0;
    
    const latestCVMonth = data.cvDownloads.monthly.length > 0 
      ? data.cvDownloads.monthly[data.cvDownloads.monthly.length - 1].count 
      : 0;

    res.json({
      success: true,
      data: {
        visits: {
          total: data.visits.total,
          thisWeek: latestWeek,
          thisMonth: latestMonth,
          history: {
            weekly: data.visits.weekly.slice(-12), // Last 12 weeks
            monthly: data.visits.monthly.slice(-12) // Last 12 months
          }
        },
        cvDownloads: {
          total: data.cvDownloads.total,
          thisWeek: latestCVWeek,
          thisMonth: latestCVMonth,
          history: {
            weekly: data.cvDownloads.weekly.slice(-12),
            monthly: data.cvDownloads.monthly.slice(-12)
          }
        },
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ success: false, message: 'Error getting analytics' });
  }
});

// Reset analytics (admin only - use with caution)
router.post('/analytics/reset', (req, res) => {
  try {
    const initialData = {
      visits: {
        total: 0,
        weekly: [],
        monthly: [],
        lastReset: new Date().toISOString()
      },
      cvDownloads: {
        total: 0,
        weekly: [],
        monthly: [],
        lastReset: new Date().toISOString()
      }
    };
    
    saveAnalyticsData(initialData);
    
    res.json({ 
      success: true, 
      message: 'Analytics reset successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resetting analytics:', error);
    res.status(500).json({ success: false, message: 'Error resetting analytics' });
  }
});

module.exports = router;
