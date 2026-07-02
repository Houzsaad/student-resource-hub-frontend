import { useFetch } from "../hooks/useFetch";
import { getResource } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DownloadResource from "./DownloadResource";

import Comments from "./components/Comments";

function ResourceDetail() {

    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [resource, setResource] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getResource(id)
            .then(data => {

            console.log("value:", data);
            setResource(data);
        })
            .catch(err =>  setError(err.message))
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
            <h2>Category: {resource.category_name}</h2>
            <a href={resource.file} target="_blank" rel="noreferrer">Open File</a>

            <DownloadResource id={resource.id} filename={resource.file} />

            <Comments resourceId={resource.id} />
        </div>
    );
}
export default ResourceDetail;