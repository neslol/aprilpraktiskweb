"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Page {
  path: string;
  creationDate: string;
  updateDate: string;
}

export default function Dashboard() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pages");
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error("Failed to fetch pages", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    (async () => {
      await fetchPages();
    })();
  }, []);

  const deletePage = async (path: string) => {
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;

    try {
      await fetch(`/api/page${path}`, { method: "DELETE" });
      fetchPages();
    } catch (err) {
      console.error("Failed to delete page", err);
    }
  };

  const createPage = async () => {
    const path = prompt("Enter the path for the new page (e.g., /my-new-page):");
    if (!path) return;
    
    const formattedPath = path.startsWith("/") ? path : `/${path}`;

    try {
      // Create empty puck data
      const initialData = { content: [], root: { props: { title: path } } };
      await fetch(`/api/page${formattedPath}`, {
        method: "POST",
        body: JSON.stringify(initialData),
        headers: { "Content-Type": "application/json" },
      });
      fetchPages();
    } catch (err) {
      console.error("Failed to create page", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Admin Dashboard</h1>
        <button 
          onClick={createPage}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Create New Page
        </button>
      </div>

      {loading ? (
        <p>Loading pages...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "0.5rem" }}>Path</th>
              <th style={{ padding: "0.5rem" }}>Updated</th>
              <th style={{ padding: "0.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.path} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.5rem" }}>
                  <Link href={page.path} target="_blank" style={{ color: "#0070f3", textDecoration: "none" }}>
                    {page.path}
                  </Link>
                </td>
                <td style={{ padding: "0.5rem" }}>
                  {new Date(page.updateDate).toLocaleString()}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  <Link href={`/editor${page.path}`} style={{ marginRight: "1rem", color: "#444" }}>
                    Edit
                  </Link>
                  <button 
                    onClick={() => deletePage(page.path)}
                    style={{ color: "red", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: "1rem", textAlign: "center", color: "#888" }}>
                  No pages found. Create one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
