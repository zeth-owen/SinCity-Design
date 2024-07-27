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
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    console.log('Fetching template for ID:', id);
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`https://api.envato.com/v3/market/catalog/item?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
          }
        });
        const data = await response.json();
        console.log('API Response:', data);
        setTemplate(data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/comments?templateId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchTemplate();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setAccessDenied(true);
      return;
    }

    const user = {
      name: 'John Doe' // Replace with actual method to retrieve user info
    };

    try {
      const response = await fetch(`http://localhost:4000/templates/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment: newComment, rating })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
      setNewComment('');
      setRating(0);
      setAccessDenied(false); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const navigateBack = () => {
    history.push('/websites'); // Uncomment when route is available
  };

  const averageRating = comments.length > 0
    ? comments.reduce((total, comment) => total + comment.rating, 0) / comments.length
    : 0;

  return (
    <div className="show-page-container">
      {template ? (
        <div className="show-page-content">
          <h1>{template.name}</h1>
          {template.previews && template.previews.landscape_preview && (
            <img
              src={template.previews.landscape_preview.landscape_url}
              alt={template.name}
              style={{ maxWidth: '100%', height: 'auto' }} // Adjust style as needed
            />
          )}
            {/* Live Site Link */}
            {template.previews && template.previews.live_site && template.previews.live_site.href ? (
            <p>
              <strong>Live Site: </strong>
              <a
                href={`https://themeforest.net${template.previews.live_site.href}`} // Construct full URL
                target="_blank"
                rel="noopener noreferrer"
                className="live-site-link">
                View Live Preview
              </a>
            </p>
          ) : (
            <p>No live site available</p>
          )}

          {/* Star Rating */}
          <StarRating rating={rating} onRating={(rate) => setRating(rate)} />
          <p>Average Rating: {averageRating.toFixed(1)}</p> {/* Display average rating with one decimal place */}

          {/* Comments Section */}
          <section className="comments-section">
            <h2>Comments</h2>
            {accessDenied && <p className="error-message">Access Denied: You must be logged in to submit a comment.</p>}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p style={{ backgroundColor: 'lightgray' }}>{comment.comment}</p>
                </div>
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
