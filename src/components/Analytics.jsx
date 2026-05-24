import React, { useState, useEffect } from 'react';
import '../styles/Analytics.css';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://mail.bcsapp.in';
      const response = await fetch(`${apiUrl}/api/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setAnalytics(result.data);
        setError(null);
      } else {
        setError('Failed to load analytics');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Error fetching analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchAnalytics();
      setPassword('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all analytics? This cannot be undone.')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://mail.bcsapp.in';
        const response = await fetch(
          `${apiUrl}/api/analytics/reset`,
          { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          }
        );
        const result = await response.json();
        if (result.success) {
          fetchAnalytics();
          alert('Analytics reset successfully');
        }
      } catch (err) {
        console.error('Error resetting analytics:', err);
        alert('Error resetting analytics');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAnalytics(null);
  };

  const refreshData = () => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="analytics-container">
        <div className="analytics-login">
          <h1>Admin Analytics</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
            <button type="submit" className="login-button">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error-message">{error}</div>
        <button onClick={refreshData} className="refresh-button">Retry</button>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Website Analytics Dashboard</h1>
        <div className="header-controls">
          <button onClick={refreshData} className="refresh-button">Refresh</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {analytics && (
        <>
          <div className="analytics-grid">
            {/* Visits Statistics */}
            <div className="analytics-card visits-card">
              <h2>Website Visits</h2>
              <div className="stat-item">
                <div className="stat-label">Total Visits</div>
                <div className="stat-value">{analytics.visits.total}</div>
              </div>
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-label">This Week</div>
                  <div className="stat-value">{analytics.visits.thisWeek}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">This Month</div>
                  <div className="stat-value">{analytics.visits.thisMonth}</div>
                </div>
              </div>
            </div>

            {/* CV Downloads Statistics */}
            <div className="analytics-card downloads-card">
              <h2>CV Downloads</h2>
              <div className="stat-item">
                <div className="stat-label">Total Downloads</div>
                <div className="stat-value">{analytics.cvDownloads.total}</div>
              </div>
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-label">This Week</div>
                  <div className="stat-value">{analytics.cvDownloads.thisWeek}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">This Month</div>
                  <div className="stat-value">{analytics.cvDownloads.thisMonth}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly History */}
          <div className="analytics-section">
            <h3>Weekly History</h3>
            <div className="history-grid">
              <div className="history-item">
                <h4>Visits - Last 12 Weeks</h4>
                <div className="history-list">
                  {analytics.visits.history.weekly.length > 0 ? (
                    analytics.visits.history.weekly.map((item, idx) => (
                      <div key={idx} className="history-entry">
                        <span className="history-label">{item.week}</span>
                        <span className="history-value">{item.count} visits</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No data yet</p>
                  )}
                </div>
              </div>

              <div className="history-item">
                <h4>Downloads - Last 12 Weeks</h4>
                <div className="history-list">
                  {analytics.cvDownloads.history.weekly.length > 0 ? (
                    analytics.cvDownloads.history.weekly.map((item, idx) => (
                      <div key={idx} className="history-entry">
                        <span className="history-label">{item.week}</span>
                        <span className="history-value">{item.count} downloads</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No data yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Monthly History */}
          <div className="analytics-section">
            <h3>Monthly History</h3>
            <div className="history-grid">
              <div className="history-item">
                <h4>Visits - Last 12 Months</h4>
                <div className="history-list">
                  {analytics.visits.history.monthly.length > 0 ? (
                    analytics.visits.history.monthly.map((item, idx) => (
                      <div key={idx} className="history-entry">
                        <span className="history-label">{item.month}</span>
                        <span className="history-value">{item.count} visits</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No data yet</p>
                  )}
                </div>
              </div>

              <div className="history-item">
                <h4>Downloads - Last 12 Months</h4>
                <div className="history-list">
                  {analytics.cvDownloads.history.monthly.length > 0 ? (
                    analytics.cvDownloads.history.monthly.map((item, idx) => (
                      <div key={idx} className="history-entry">
                        <span className="history-label">{item.month}</span>
                        <span className="history-value">{item.count} downloads</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-data">No data yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-footer">
            <p>Last Updated: {new Date(analytics.lastUpdated).toLocaleString()}</p>
            <button onClick={handleReset} className="reset-button">Reset Analytics</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
