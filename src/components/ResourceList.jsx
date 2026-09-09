import { getResources } from "../api";
import { useEffect, useState, useRef } from "react";
import ResourceCard from "./ResourceCard";
import "./ResourceList.css";
import ShimmerCard from "./ShimmerCard";

import { useSearchParams } from "react-router-dom";


function ResourceList (){
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();
    const searchInputRef = useRef(null);

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

    useEffect(() => {
        if (searchParams.get("focus") === "search" && searchInputRef.current) {
            searchInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            searchInputRef.current.focus();
        }
    }, [searchParams]);


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
                ref={searchInputRef}
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