import { getCategories, uploadResource } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./UploadForm.css";

function UploadForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(data => setCategories(data.results || data));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("category", categoryId);

    setLoading(true);

    const data = await uploadResource(formData);

    if (data.id) {
      setSuccess("Resource uploaded successfully");
      setTimeout(() => navigate("/resources/"), 1500);
    } else {
      setError("Oops! Upload failed");
      setLoading(false);
    }
  }

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload Resource</h2>
        <p className="upload-subtitle">Share your notes, PDFs or links with others</p>

        {success && <p className="upload-success">{success}</p>}
        {error && <p className="upload-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="upload-form-group">
            <label>Title</label>
            <textarea
              placeholder="Write the resource title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="upload-form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Write a short description"
            />
          </div>

          <div className="upload-form-group">
            <label>Category</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="upload-form-group">
            <label>File</label>
            <input
              className="upload-file-input"
              type="file"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>

          <button 
            type="submit" 
            className="upload-btn"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadForm;