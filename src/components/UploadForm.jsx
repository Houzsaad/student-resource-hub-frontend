import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UploadForm.css";

import { getCategories, submitResource } from "../api";

function UploadForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [resourceType, setResourceType] = useState("pdf");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(data => setCategories(data.results || data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) return setError("Title is required");
    if (!categoryId) return setError("Please select a category");

    if (resourceType === "link" && !link) {
      return setError("Please enter a URL");
    }

    if (resourceType !== "link" && !file) {
      return setError("Please select a file");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", categoryId);
    formData.append("resource_type", resourceType);

    if (resourceType === "link") {
      formData.append("link", link);
    } else {
      formData.append("file", file);
    }

    setLoading(true);
    setError("");

    try {
      const data = await submitResource(formData);

      if (data.id) {
        setSuccess(
          "Resource submitted successfully. It will be reviewed soon..."
        );

        setTimeout(() => navigate("/resources/"), 1500);
      } else {
        setError("Oops! Upload failed");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="upload-page">
      <div className="upload-card">

        <h2>Submit Resource</h2>

        <p className="upload-subtitle">
          Share academic resources with other students
        </p>

        {success && (
          <p className="upload-success">{success}</p>
        )}

        {error && (
          <p className="upload-error">{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="upload-form-group">
            <label>Resource Type</label>

            <select
              value={resourceType}
              onChange={e => {
                setResourceType(e.target.value);
                setFile(null);
                setLink("");
                setError("");
              }}
            >
              <option value="pdf">PDF</option>
              <option value="image">Image</option>
              <option value="link">Link (URL)</option>
            </select>
          </div>

          <div className="upload-form-group">
            <label>Title</label>

            <textarea
              placeholder="Example: COS202, 2024/25 Second Semester Past Questions"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="upload-form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Briefly describe this resource"
            />
          </div>

          <div className="upload-form-group">
            <label>Category</label>

            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">
                Select a category
              </option>

              {categories.map(cat => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {resourceType === "link" ? (

            <div className="upload-form-group">
              <label>Resource URL</label>

              <input
                type="url"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>

          ) : (

            <div className="upload-form-group">

              <label>
                {resourceType === "pdf"
                  ? "PDF File"
                  : "Image File"}
              </label>

              <input
                className="upload-file-input"
                type="file"
                accept={
                  resourceType === "pdf"
                    ? ".pdf"
                    : "image/*"
                }
                onChange={e =>
                  setFile(e.target.files[0])
                }
              />

            </div>

          )}

          <button
            type="submit"
            className="upload-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Resource"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default UploadForm;