//ready
import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!url) return;
    // Simple fake shortener
    const short = "short.ly/" + Math.random().toString(36).substring(7);
    setShortUrl(short);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔗 URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button onClick={handleShorten} style={{ marginLeft: "10px", padding: "8px" }}>
        Shorten
      </button>

      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          Shortened URL: <a href={url} target="_blank">{shortUrl}</a>
        </p>
      )}
    </div>
  );
}


