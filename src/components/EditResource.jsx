import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResource, getCategories, editResource } from "../api";
import "./UploadForm.css";

function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load resource and categories
  useEffect(() => {
    async function loadData() {
      try {
        const [resource, categoryData] = await Promise.all([
          getResource(id),
          getCategories(),
        ]);

        if (!resource.is_owner) {
          navigate(`/resources/${id}`);
          return;
        }

        setTitle(resource.title || "");
        setDescription(resource.description || "");
        setCategoryId(resource.category);

        setCategories(categoryData.results || categoryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!categoryId) {
      setError("Please select a category");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await editResource(id, {
        title: title.trim(),
        description: description.trim(),
        category: categoryId,
      });

      if (data.id) {
        setSuccess("Resource updated successfully");

        setTimeout(() => {
          navigate(`/resources/${id}`);
        }, 1000);
      } else {
        setError("Oops! Update failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="upload-page">
        <div className="upload-card">
          <p>Loading resource...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="upload-card">

        <h2>Edit Resource</h2>

        <p className="upload-subtitle">
          Update the information about your resource
        </p>

        {success && (
          <p className="upload-success">
            {success}
          </p>
        )}

        {error && (
          <p className="upload-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="upload-form-group">
            <label>Title</label>

            <textarea
              placeholder="Write the resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="upload-form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description"
            />
          </div>

          {/* Category */}
          <div className="upload-form-group">
            <label>Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">
                Select a category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Resource file cannot be changed */}
          <div className="upload-form-group">
            <label>Resource File</label>

            <p>
              The uploaded file cannot be changed after uploading.
            </p>
          </div>

          <button
            type="submit"
            className="upload-btn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="upload-btn"
            onClick={() => navigate(`/resources/${id}`)}
            disabled={saving}
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditResource;