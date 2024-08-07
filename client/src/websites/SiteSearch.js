import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; 
import '../App.css';
import { Link } from 'react-router-dom'; 

const SiteSearch = () => {
  const [query, setQuery] = useState('');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCompleted, setSearchCompleted] = useState(false); // Track if search is completed

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchCompleted(false); // Reset search completed state before starting a new search

    const searchTerm = encodeURIComponent(`${query} website templates`);
    const site = 'themeforest.net'; 

    try {
      const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?term=${searchTerm}&site=${site}`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Fetched apps:', data.matches);
      setTemplates(data.matches);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
      setSearchCompleted(true); // Mark search as completed
    }
  };

  return (
    <div className='background-container'>
      <h1 className='page-title'>Websites</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Category..."
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
        ) : templates.length > 0 ? (
          templates.map(template => (
            <div key={template.id} className="template-card">
              <div className="card-content">
                <h3>{template.name}</h3>
                {template.previews && template.previews.landscape_preview && (
                  <img src={template.previews.landscape_preview.landscape_url} alt={template.name} />
                )}
                <p>Category: {template.key_features}</p>
              </div>
              <div className="card-footer">
                <p>Designer: {template.author_username}</p>
                <Link to={`/templates/${template.id}`} style={{ color: 'blue' }}>
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : searchCompleted ? (
          <p>No results found.</p>
        ) : null}
      </div>

      <StickyFooter />
    </div>
  );
};

export default SiteSearch;




