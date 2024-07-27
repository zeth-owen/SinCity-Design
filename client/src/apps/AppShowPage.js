import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StarRating from '../websites/StarRating';



const AppShowPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [template, setTemplate] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await fetch(`https://api.envato.com/v1/discovery/search/search/item?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_ENVATO_API_KEY}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch app');
        }
  
        const data = await response.json();
        console.log('API Response:', data)
        const app = data.matches.find(app => app.id === id); 
  
        if (app) {
          setTemplate(app);
        } else {
          console.warn(`No app found with ID: ${id}`);
        }
      } catch (error) {
        console.error('Error fetching app:', error);
      }
    };
  
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/apps/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchApp();
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
      const response = await fetch(`http://localhost:4000/apps/${id}/comments`, {
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
    history.push('/apps'); 
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
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          </section>

          {/* "Back to Apps" button */}
          <button className="back-button" onClick={navigateBack}>Back to Apps</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AppShowPage;
