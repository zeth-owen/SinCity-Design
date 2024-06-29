import React, { useState } from 'react';

const SiteSearch = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Implement API call logic here using `query`
    console.log(`Searching websites for: ${query}`);
    // Example: fetch(`https://api.example.com/websites?q=${query}`)
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Websites..."
      />
      <button className='search' onClick={handleSearch}>Search</button>
      {/* Add result display logic here */}
    </div>
  );
};

export default SiteSearch;
