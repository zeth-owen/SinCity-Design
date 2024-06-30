import React, { useState } from 'react';

const PhotoSearch = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching photos for: ${query}`);
   
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Photos..."
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default PhotoSearch;

