import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StarRating from '../websites/StarRating';

const PhotoShowPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${process.env.ACCESS_KEY}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch photo: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setError('Error fetching photo. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/comments?photoId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPhoto();
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
      const response = await fetch(`http://localhost:4000/photos/${id}/comments`, {
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
      setAccessDenied(false); // Reset access denied state
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const navigateBack = () => {
    history.push('/photos'); // Adjust the path as needed
  };

  return (
    <div className="show-page-container">
      {photo ? (
        <div className="show-page-content">
          <h1>{photo.alt_description}</h1>
          <img className="template-image" src={photo.urls.regular} alt={photo.alt_description} />

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

          {/* "Back to Photos" button */}
          <button className="back-button" onClick={navigateBack}>Back to Photos</button>
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>{error || 'Photo not found.'}</p>
      )}
    </div>
  );
};

export default PhotoShowPage;
