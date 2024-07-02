import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; // Adjust the path based on your project structure

const PhotoSearch = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
        headers: {
        Authorization: `Client-ID ${process.env.ACCESS_KEY}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPhotos(data.results);
    } catch (error) {
      console.error('Error fetching photos:', error.message);
      setError('Error fetching photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='page-title'>Photos</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Photos..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="template-grid">
        {photos.length > 0 ? (
          photos.map(photo => (
            <div key={photo.id} className="template-card">
              <div className="card-content">
                <img src={photo.urls.regular} alt={photo.alt_description} />
              </div>
            </div>
          ))
        ) : (
          <p>{loading ? 'Searching...' : 'No photos found.'}</p>
        )}
      </div>
      <StickyFooter />
    </div>
  );
};

export default PhotoSearch;





