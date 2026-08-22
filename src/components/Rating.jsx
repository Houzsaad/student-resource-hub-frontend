import { useState } from "react";
import { createRating } from "../api";
import { useAuth } from "../context/AuthContext";
import "./Rating.css";
import { Link } from "react-router-dom";

function Rating({ resourceId }) {
  const { isLoggedIn } = useAuth();

  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isLoggedIn) {
    return (
     <div>
       <p className="rating-section">
         <h3>Rating</h3>
          <Link to="/login">Login</Link> to leave a rating
       </p>
     </div>
     );
  }

  async function handleRating(value) {
    setScore(value);
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await createRating(resourceId, value);

      setMessage("Thanks for rating this resource! ⭐");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rating-section">
      <h3>Rate this resource</h3>

      <div className="rating-buttons">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRating(value)}
            disabled={loading}
            className={score >= value ? "rating-star active" : "rating-star"}
          >
            ★
          </button>
        ))}
      </div>

      {loading && <p>Submitting rating...</p>}

      {message && (
        <p className="rating-success">
          {message}
        </p>
      )}

      {error && (
        <p className="rating-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Rating;