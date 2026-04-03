import { useState, useRef } from "react";

const ACCEPTED = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif"
];

export default function App() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function handleFile(f) {
    if (!f) return;

    if (!ACCEPTED.includes(f.type)) {
      setError("Unsupported file type. Please upload a PDF or image.");
      return;
    }

    setError("");
    setFile(f);
  }

  const onDrop = e => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onDragOver = e => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      minHeight: "100vh",
      background: "#0f1117",
      color: "#e2e8f0",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* Header */}
      <div style={{
        padding: "16px 24px",
        borderBottom: "1px solid #1e2535",
        display: "flex",
        alignItems: "center",
        gap: 12
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>📄</div>

        <div>
          <div style={{ fontWeight: 700 }}>Document Upload</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Upload and manage your documents
          </div>
        </div>

        {file && (
          <div style={{
            marginLeft: "auto",
            background: "#1e2535",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 12,
            color: "#94a3b8"
          }}>
            📎 {file.name}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* Sidebar */}
        <div style={{
          width: 260,
          borderRight: "1px solid #1e2535",
          padding: 16,
          background: "#0d1020"
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#475569",
            marginBottom: 8
          }}>
            DOCUMENT
          </div>

          <div
            onClick={() => document.getElementById("fileInput").click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            style={{
              border: `2px dashed ${dragging ? "#6366f1" : file ? "#22c55e" : "#2d3748"}`,
              borderRadius: 10,
              padding: "24px 12px",
              textAlign: "center",
              cursor: "pointer",
              background: dragging ? "#1a1f35" : "#111827"
            }}
          >
            <div style={{ fontSize: 28 }}>
              {file ? "✅" : "☁️"}
            </div>

            <div style={{ fontSize: 12, marginTop: 8 }}>
              {file ? file.name : "Click or drag & drop"}
            </div>

            {!file && (
              <div style={{ fontSize: 11, color: "#374151", marginTop: 4 }}>
                PDF · PNG · JPG · WEBP
              </div>
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.gif"
            style={{ display: "none" }}
            onChange={e => handleFile(e.target.files[0])}
          />

          {file && (
            <button
              onClick={() => setFile(null)}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "6px",
                background: "transparent",
                border: "1px solid #2d3748",
                borderRadius: 6,
                color: "#64748b",
                cursor: "pointer"
              }}
            >
              Remove file
            </button>
          )}
        </div>

        {/* Main area */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#374151"
        }}>
          {error ? (
            <div style={{ color: "#f87171" }}>⚠️ {error}</div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40 }}>📄</div>
              <div style={{ marginTop: 10 }}>
                {file ? "File uploaded successfully!" : "Upload a document to begin"}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}