import { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";

function ResourceList (){
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/resources/resources/?search=${search}`)
            

            .then(res=> {
                console.log("Response:", res);
                return res.json();
            })

            .then(data => {
                console.log("data:", data);
                setResources(data); 
            })

            .catch(err => {
                console.log("error:", err);
                setError(err.message);
            })

            .finally(() => {
                console.log("Finished");
                setLoading(false);
            })

    },  [search]);

    if (loading) return <p>loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (resources.length === 0) return <p>Resource Not Found</p>

    return(
        <div>
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search resources..."
            />
            
            {resources.map(r => 
                <ResourceCard key={r.id} title={r.title} {...r} />
            )}
        </div>
    );
}
export default ResourceList;