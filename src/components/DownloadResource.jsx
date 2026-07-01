import { useState } from "react";
import { downloadResource } from "../api";

function DownloadResource({ id, filename, initialCounter = 0 }) {
  const [count, setCount] = useState(initialCounter)
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await downloadResource(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "resource";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setCount(prev => prev + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setDownloading(false);
    }
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <button onClick={handleDownload} disabled={downloading}>
            {downloading ? "Downloading..." : "Download"}
        </button>
        <p>Downloads: {count}</p>
    </div>
  );
}

export default DownloadResource;