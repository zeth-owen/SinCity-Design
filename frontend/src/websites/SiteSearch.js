import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; // Adjust the path based on your project structure

const SiteSearch = () => {
  const [query, setQuery] = useState('');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const searchTerm = `${query} website template`;

    try {
      const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?term=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer CL4GksVyyG2InLzQjrBNQef7h8aHEcr5`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log('Fetched templates:', data.matches); 
      setTemplates(data.matches);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        {templates.length > 0 ? (
          templates.map(template => (
            <div key={template.id} className="template-card">
              <div className="card-content">
                <h3>{template.name}</h3>
                {template.previews && template.previews.landscape_preview && (
                  <img src={template.previews.landscape_preview.landscape_url} alt={template.name} />
                )}
                <p>Category: {template.category}</p>
              </div>
              <div className="card-footer">
                <p>Designer: {template.designer}</p>
                {/* Pass template id to ShowPage via Link */}
                <a href={`/templates/${template.id}`} target="_blank" rel="noopener noreferrer">View Details</a>
              </div>
            </div>
          ))
        ) : (
          <p>{loading ? 'Searching...' : 'No templates found.'}</p>
        )}
      </div>
      <StickyFooter />
    </div>
  );
};

export default SiteSearch;


