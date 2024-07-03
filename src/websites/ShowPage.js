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

    try {
      const token = localStorage.getItem('token');
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
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const navigateBack = () => {
    history.push('/websites'); // Navigate back to websites page
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

          <StarRating rating={rating} onRating={(rate) => setRating(rate)} />
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
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.comment}</p>
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









