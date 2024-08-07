import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; 
import { Link } from 'react-router-dom'; 

const AppSearch = () => {
  const [query, setQuery] = useState('');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCompleted, setSearchCompleted] = useState(false); // Track if search is completed

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchCompleted(false); // Reset search completed state before starting a new search

    const appSearchTerm = encodeURIComponent(`${query} app`);
    const appSite = 'themeforest.net';

    try {
      const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?term=${appSearchTerm}&site=${appSite}`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Fetched apps:', data.matches);
      
      setApps(data.matches);
    } catch (error) {
      console.error('Error fetching apps:', error);
      setError('Error fetching apps. Please try again later.');
    } finally {
      setLoading(false);
      setSearchCompleted(true); // Mark search as completed
    }
  };

  return (
    <div className='background-container'>
      <h1 className='page-title'>Apps</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Apps..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="template-grid">
        {loading ? (
          <p>Searching...</p>
        ) : apps.length > 0 ? (
          apps.map(app => {
            const hasLandscapePreview = app.previews?.landscape_preview?.landscape_url;
            const hasIconPreview = app.previews?.icon_with_landscape_preview?.icon_url;

            return (
              <div key={app.id} className="template-card">
                <div className="card-content">
                  <h3>{app.name}</h3>
                  
                  {/* Render landscape preview if available, otherwise render icon */}
                  {hasLandscapePreview ? (
                    <img
                      src={hasLandscapePreview}
                      alt={`${app.name} landscape preview`}
                      className="preview-image"
                    />
                  ) : hasIconPreview ? (
                    <img
                      src={hasIconPreview}
                      alt={`${app.name} icon preview`}
                      className="preview-image"
                    />
                  ) : (
                    <p>No preview available</p> // Optional fallback if neither preview is available
                  )}
                  
                  <p>Category: {app.classification}</p>
                </div>
                <div className="card-footer">
                  <p>Designer: {app.author_username}</p>
                  {/* Add link to app details page */}
                  <Link to={`/apps/${app.id}`} style={{ color: 'blue' }}>View Details</Link>
                </div>
              </div>
            );
          })
        ) : searchCompleted ? (
          <p>No results found.</p>
        ) : null}
      </div>
      <StickyFooter />
    </div>
  );
};

export default AppSearch;






