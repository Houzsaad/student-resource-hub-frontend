import { useNavigate } from "react-router-dom";
import "./ResourceCard.css";

function ResourceCard({ id, title, description, created_at }) {
  const navigate = useNavigate();

  // Format date nicely
  const date = new Date(created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <p className="card-description">{description}</p>
      <p className="card-date">{date}</p>
      <button
        className="card-btn"
        onClick={() => navigate(`/resources/${id}`)}
      >
        Open Resource
      </button>
    </div>
  );
}

export default ResourceCard;