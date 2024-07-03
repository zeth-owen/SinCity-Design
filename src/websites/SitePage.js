import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const ShowPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [template, setTemplate] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
          }
        });
        const data = await response.json();
        setTemplate(data.matches[0]); 
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const navigateBack = () => {
    history.push('/websites'); // Replace with your actual route
  };

  return (
    <div className="show-page-container">
      {template ? (
        <div className="show-page-content">
          <h1>{template.name}</h1>
          {template.previews && template.previews.landscape_preview && (
            <img src={template.previews.landscape_preview.landscape_url} alt={template.name} />
          )}
          <p>Category: {template.category}</p>
          <p>Designer: {template.designer}</p>

          <StarRating rating={rating} onRating={handleRating} />
          <p>Average Rating: {rating}</p>

          <section className="comments-section">
            <h2>Comments</h2>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <div className="comments-list">
              {comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </section>

          {/* "Back to Websites" button */}
          <button className="back-button" onClick={navigateBack}>Back to Websites</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowPage;

