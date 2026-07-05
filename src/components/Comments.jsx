import { useState, useEffect } from "react";
import { getComments, createComment } from "../api";
import { useAuth } from "../context/AuthContext";

import "./Comments.css";

function Comments({ resourceId }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    getComments(resourceId)
      .then(data => setComments(data.results || data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [resourceId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim()) return;

    const data = await createComment(resourceId, body);

    if (data.id) {
      setComments(prev => [data, ...prev]);
      setBody("");
    } else {
      setError("Failed to post comment");
    }
  }

  if (loading) return <p>Loading comments...</p>;
return (
    <div>
      <h3 className="comments-header">
        Comments ({comments.length})
      </h3>

      {isLoggedIn ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="comment-submit-btn" type="submit">
            Post Comment
          </button>
        </form>
      ) : (
        <p className="comment-login-msg">
          <Link to="/login">Login</Link> to leave a comment
        </p>
      )}

      {error && <p className="comment-error">{error}</p>}

      {comments.length === 0 ? (
        <p className="comments-empty">No comments yet — be the first!</p>
      ) : (
        <div className="comment-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <p className="comment-author">{comment.user}</p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-date">
                {new Date(comment.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;