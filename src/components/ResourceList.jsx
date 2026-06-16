import { getResources } from "../api";
import { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";

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
            setResources(data);
        })
            .catch(err =>  setErrorr(err.message))
            .finally(() => setLoading(false));
    }, [search]);


    if (loading) return <p>loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <div>
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search resources..."
            />

            {resources.length === 0 ? (
                <p>Resource Not Found</p>
            ) : (
            
                resources.map(r => (
                <ResourceCard key={r.id} {...r} />
            ))
        )}
        </div>
    );
}
export default ResourceList;