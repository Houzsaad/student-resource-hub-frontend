import { useState, useEffect } from "react";
import { getComments, createComment } from "../api";
import { useAuth } from "../context/AuthContext";

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
      <h3>Comments ({comments.length})</h3>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <p>Login to leave a comment</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {comments.length === 0 ? (
        <p>No comments yet — be the first!</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id}>
            <p><strong>{comment.user}</strong></p>
            <p>{comment.body}</p>
            <p>{new Date(comment.created_at).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;