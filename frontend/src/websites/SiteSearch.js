import React, { useState } from 'react';

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
          'Authorization': `Bearer ` 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setTemplates(data.matches); 
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Websites</h1>
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
        {templates.map(template => (
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
              
              <a href={`/templates/${template.id}`} target="_blank" rel="noopener noreferrer">View Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSearch;




