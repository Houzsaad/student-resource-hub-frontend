import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ResourceDetail() {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/resources/resources/${id}/`)
        .then(res => res.json())
        .then(data => setResource(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!resource) return <p>Resource Not Found</p>;

    return (
        <div>
            <h2>Title: {resource.title}</h2>
            <h2>Descriptoion: {resource.description}</h2>
            <h2>Uploaded by: {resource.uploaded_by}</h2>
        </div>
    );
}
export default ResourceDetail;