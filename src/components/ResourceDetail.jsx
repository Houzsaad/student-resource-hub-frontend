import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getResource } from "../api";
import DownloadResource from "./DownloadResource";
import Comments from "../components/Comments";
import ShimmerCard from "./ShimmerCard";
import "./ResourceDetail.css";


function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    ? resource.file
    : null;
    
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
                {isPDF ?  "Open Image" : "Open Video"}
              </a>

              <DownloadResource
              id={resource.id}
              filename={resource.title}
              initialCount={resource.download_count}
            />
          </>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <Comments resourceId={resource.id} />
      </div>
    </div>
  );
}
export default ResourceDetail;