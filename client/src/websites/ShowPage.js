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
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`https://api.envato.com/v3/market/catalog/item?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch template');
        const data = await response.json();
        setTemplate(data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/comments/${id}`);
        if (!response.ok) throw new Error('Failed to fetch comments');
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

    try {
      const response = await fetch(`http://localhost:4000/templates/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comment: newComment, rating })
      });

      if (!response.ok) throw new Error('Failed to submit comment');
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
    history.push('/websites');
  };

  const averageRating = comments.length > 0
    ? comments.reduce((total, comment) => total + comment.rating, 0) / comments.length
    : 0;

  return (
    <div className="show-page-container">
      {template ? (
        <div className="show-page-content">
          <h1 className="page-title">{template.name}</h1>
          {template.previews?.landscape_preview && (
            <img
              src={template.previews.landscape_preview.landscape_url}
              alt={template.name}
              className="template-image"
            />
          )}

          {template.previews?.live_site?.href ? (
            <p className="live-site">
              <strong>Live Site: </strong>
              <a
                href={`https://themeforest.net${template.previews.live_site.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="live-site-link"
              >
                View Live Preview
              </a>
            </p>
          ) : (
            <p>No live site available</p>
          )}

          <StarRating rating={rating} onRating={(rate) => setRating(rate)} />
          <p className="average-rating">Average Rating: {averageRating.toFixed(1)}</p>

          <section className="comments-section">
            <h2>Comments</h2>
            {accessDenied && <p className="error-message">Access Denied: You must be logged in to submit a comment.</p>}
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="comment-textarea"
              ></textarea><br/>
              <button type="submit" className="comment-submit-button">Submit</button>
            </form>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-name">{comment.first_name} {comment.last_name}:</p>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))}
            </div>
          </section>

          <button className="back-button" onClick={navigateBack}>Back to Websites</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowPage;
