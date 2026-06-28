import { useNavigate } from "react-router-dom";

function ResourceCard({id, title, category, description, file, created_at}) {

  const navigate = useNavigate();

    return (
      <div className="card">
        <p>Title: {title}</p>
        {/* <p>Category: {category}</p> */}
        <p>Description: {description}</p>
        {/* <p>File: {file}</p> */}
        <p>Created At: {created_at}</p>
        <button onClick={() => navigate(`/resources/${id}`)}>
          Open Resource</button>
      </div>

    );
  }
  export default ResourceCard;