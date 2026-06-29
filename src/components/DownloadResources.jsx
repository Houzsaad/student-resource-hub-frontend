import { useState } from "react";
import { downloadRes } from "../api"; 

function DownloadResource({ id, fileUrl}) {
    const [count, setCount ] = useState(0);
    const [error, setError] = useState(null);

    async function handdleDownload() {
        const data = await downloadRes(id)
        .catch (err => setError(err.message));

        if (data) {
            setCount(data.download_count);
            window.open(fileUrl, "_blank");
        }
    }
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={handdleDownload}>Download</button>
            {count > 0 && <p>Downloads: {count}</p>}
        </div>
    )
}

export default DownloadResource;