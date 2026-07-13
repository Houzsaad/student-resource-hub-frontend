import { getResources } from "../api";
import { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";

import "./ResourceList.css";

import ShimmerCard from "./ShimmerCard";

function ResourceList (){
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() =>{
        console.log("Search value:", search);
        
        getResources(search)
            .then(data => {
            console.log("value:", data);
            setResources(data || []);
        })
            .catch(err =>  setError(err.message))
            .finally(() => setLoading(false));
    }, [search]);


    if (loading) return (
    <div className="resource-list-page">
        <div className="resource-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
            <ShimmerCard key={i} />
        ))}
        </div>
    </div>
    );

    if (error) return <p>Error: {error}</p>;


    return (
        <div className="resource-list-page">
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search resources..."
            />

            {resources.length === 0 ? (
                <p className="empty-state">Resource Not Found</p>
            ) : (
                <div className="resource-grid">
                    {resources.map(r => (
                        <ResourceCard key={r.id} {...r} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default ResourceList;