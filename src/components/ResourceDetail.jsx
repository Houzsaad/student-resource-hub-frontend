import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResource, deleteResource } from "../api";

import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom"; 

import DownloadResource from "./DownloadResource";
import Comments from "../components/Comments";
import ShimmerCard from "./ShimmerCard";
import "./ResourceDetail.css";
import Rating from "./Rating";


function ResourceDetail() {
  const { id } = useParams();

  const { token } = useAuth();
  const navigate = useNavigate()

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getResource(id)
      .then(data => setResource(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ShimmerCard />;
  if (error) return <p>Error: {error}</p>;
  if (!resource) return <p>Resource not found</p>;

  const isLink = resource.resource_type === "link"
  const isPDF = resource.resource_type === "pdf"
  const isImage = resource.resource_type === "image"

  const fileUrl = resource.file
    ? isPDF
      ? resource.file.replace('/upload/', '/upload/fl_attachment:false/')
      : resource.file
    : null;
    
  const isOwner = resource.is_owner;

  

    const handleDelete = async () => {
      const confirmed = window.confirm(
        "A y sure you wanna delete this resource?"
      );

      if (!confirmed) return ;
      
      try {
        setDeleting(true);
        await deleteResource(resource.id);

        navigate("/resources");
      } catch (err) {
        setError(err.message);
        setLoading(false)
      }
    }

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-card">
        <h2 className="resource-detail-title">{resource.title}</h2>
        <p className="resource-detail-description">{resource.description}</p>

        <div className="resource-detail-meta">
          <p className="resource-meta-item">
            Uploaded by: <span>{resource.uploaded_by}</span>
          </p>
          <p className="resource-meta-item">
            Category: <span>{resource.category_name}</span>
          </p>

           <p className="resource-meta-item">
            Type: <span>{resource.resource_type?.toUpperCase()}</span>
          </p>
        </div>

        <div className="resource-actions">
          {isLink ? (
            <a 
              className="open-file-btn"
              href={resource.link}
              target="_blank"
              rel="noreferrer"
          >
            Open Link
          </a>   
          ) : (
            <>
              <a
                className="open-file-btn"
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
              >
                {isPDF ?  "Open PDF" : "Open Image"}
              </a>

              <DownloadResource
              id={resource.id}
              filename={resource.title}
              initialCounter={resource.download_count}
            />
          </>
          )}
  
          {resource.is_owner && (
            <button
              className="delete-resource-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Resource"}
            </button>

          )}

         {isOwner && (
          <>
            <Link
            className="edit-resource-btn"
            to={`/resources/${resource.id}/edit`}
          >
             Edit
         </Link>
         
           
        </>
        )}
        </div>
      </div>

      <div className="rating-section-wrapper">
        <Rating resourceId={resource.id} />
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <Comments resourceId={resource.id} />
      </div>
    </div>
  );
}
export default ResourceDetail;