import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; 

const AppSearch = () => {
  const [query, setQuery] = useState('');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const searchTerm = `${query} apps`;

    try {
      const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?term=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer CL4GksVyyG2InLzQjrBNQef7h8aHEcr5`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }

      const data = await response.json();
      console.log('Fetched apps:', data.matches);
      setApps(data.matches);
    } catch (error) {
      console.error('Error fetching apps:', error);
      setError('Error fetching apps. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        {apps.length > 0 ? (
          apps.map(app => (
            <div key={app.id} className="template-card">
              <div className="card-content">
                <h3>{app.name}</h3>
                {app.previews && app.previews.icon && (
                  <img src={app.previews.icon.icon_url} alt={app.name} />
                )}
                <p>Category: {app.category}</p>
              </div>
              <div className="card-footer">
                <p>Developer: {app.developer}</p>
                {/* Add link to app details page */}
                <a href={`/apps/${app.id}`} target="_blank" rel="noopener noreferrer">View Details</a>
              </div>
            </div>
          ))
        ) : (
          <p>{loading ? 'Searching...' : 'No apps found.'}</p>
        )}
      </div>
      <StickyFooter />
    </div>
  );
};

export default AppSearch;





