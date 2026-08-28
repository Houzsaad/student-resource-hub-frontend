import { useEffect, useState } from "react";
import {
  pendingSubmissions,
  approveSubmission,
  rejectSubmission,
} from "../api";
import "./PendingSubmissions.css";
import ShimmerCard from "./ShimmerCard";

function PendingSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
    try {
      setLoading(true);
      setError("");

      const data = await pendingSubmissions();
      setSubmissions(data.results || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    try {
      setProcessingId(id);
      setError("");
      setMessage("");

      await approveSubmission(id);

      setSubmissions(prev =>
        prev.filter(submission => submission.id !== id)
      );

      setMessage("Resource approved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this resource?"
    );

    if (!confirmed) return;

    try {
      setProcessingId(id);
      setError("");
      setMessage("");

      await rejectSubmission(id);

      setSubmissions(prev =>
        prev.filter(submission => submission.id !== id)
      );

      setMessage("Resource rejected successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessingId(null);
    }
  }
  
      if (loading) return (
      <div className="resource-list-page">
          <div className="resource-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
              <ShimmerCard key={i} />
          ))}
          </div>
      </div>
      );

  return (
    <div className="pending-submissions">
      <h2>Pending Resource Submissions</h2>

      {error && (
        <p className="submission-error">
          {error}
        </p>
      )}

      {message && (
        <p className="submission-success">
          {message}
        </p>
      )}

      {submissions.length === 0 ? (
        <p>No pending submissions.</p>
      ) : (
        submissions.map(submission => (
          <div
            className="submission-card"
            key={submission.id}
          >

            <h3>{submission.title}</h3>

            <p>{submission.description}</p>

            {/* //<h4>Submitted Resources</h4> */}
            <div className="submission-preview">

              {submission.resource_type === "image" &&
                submission.file && (
                  <img
                    src={submission.file}
                    alt={submission.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                    }}
                  />
                )}

              {submission.resource_type === "video" &&
                submission.file && (
                  <video
                    src={submission.file}
                    controls
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                    }}
                  />
                )}

              {submission.resource_type === "pdf" &&
                submission.file && (
                  <iframe
                    src={submission.file}
                    title={submission.title}
                    width="100%"
                    height="500"
                  />
                )}

              {submission.resource_type === "link" &&
                submission.link && (
                  <a
                    href={submission.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Submitted Link
                  </a>
                )}

            </div>

            <div className="submission-actions">
              <button
                onClick={() => handleApprove(submission.id)}
                disabled={processingId === submission.id}
              >
                {processingId === submission.id
                  ? "Processing..."
                  : "Approve"}
              </button>

              <button
                onClick={() => handleReject(submission.id)}
                disabled={processingId === submission.id}
              >
                {processingId === submission.id
                  ? "Processing..."
                  : "Reject"}
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default PendingSubmissions;