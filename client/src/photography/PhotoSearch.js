import React, { useState } from 'react';
import StickyFooter from '../StickyFooter'; 

const PhotoSearch = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCompleted, setSearchCompleted] = useState(false); // Track if search is completed

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchCompleted(false); // Reset search completed state before starting a new search

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`, {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
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
      setSearchCompleted(true); // Mark search as completed
    }
  };

  return (
    <div className='background-container'>
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
        {loading ? (
          <p>Searching...</p>
        ) : photos.length > 0 ? (
          photos.map(photo => (
            <div key={photo.id} className="template-card">
              <div className="card-content">
                <img src={photo.urls.regular} alt={photo.alt_description} />
              </div>
            </div>
          ))
        ) : searchCompleted ? (
          <p>No photos found.</p>
        ) : null}
      </div>
      <StickyFooter />
    </div>
  );
};

export default PhotoSearch;






