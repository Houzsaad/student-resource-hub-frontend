import { uploadResource } from "../api";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function UploadForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [cateogry, setCategory] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", file);
        formData.append("category", cateogry)

        const token = localStorage.getItem("access_token");

        const res = await fetch("http://127.0.0.1:8000/api/resources/resources/", {

            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const data = await res.json();
        console.log(data);

        const navigate = useNavigate();
        if(res.ok) {
            setError("Resource uploaded successufully")
            setTimeout(() => 
                navigate("/resources/"), 1500);
        } else {
            setError("Oops! Upload failed")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Upload Resource</h2>
            {error && <p style={{ color: "red"}}>{error}</p>}

            <textarea 
                type="text" 
                placeholder="write the content title"
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />

            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="write the content description"
            />

            <input
                value={cateogry}
                onChange={e => setCategory(e.target.value)}
                placeholder="write the content description"
            />

            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
            />

            <button type="submit">Upload</button>
        </form>
    );
}
export default UploadForm;