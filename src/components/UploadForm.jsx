import { getCategories, uploadResource } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UploadForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

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

    const data = await uploadResource(formData);
    console.log(data);

    if (data.id) {
      setError("Resource uploaded successfully");
      setTimeout(() => navigate("/resources/"), 1500);
    } else {
      setError("Oops! Upload failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Resource</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <textarea
        placeholder="write the content title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="write the content description"
      />

      <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
        <option value="">Select a category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;