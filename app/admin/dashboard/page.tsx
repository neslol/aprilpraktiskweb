"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Page {
  path: string;
  published: boolean;
  isRoot: boolean;
  creationDate: string;
  updateDate: string;
}

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  createdAt: string; // Or dynamic date string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"pages" | "users" | "submissions">("pages");
  const [pages, setPages] = useState<Page[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pages");
      if (!res.ok) throw new Error("Failed to fetch");
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setPages(data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Failed to fetch pages", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmissions = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/contact-submissions");
    if (!res.ok) throw new Error("Failed to fetch submissions");
    const data = await res.json();
    setSubmissions(data);
  } catch (err) {
    console.error("Failed to fetch submissions", err);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  if (activeTab === "pages") {
    fetchPages();
  } else if (activeTab === "users") {
    fetchUsers();
  } else {
    fetchSubmissions();
  }
}, [activeTab, fetchPages, fetchUsers, fetchSubmissions]);

  const deletePage = async (path: string) => {
    if (!confirm(`Are you sure you want to delete ${path}? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/page${path}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await fetchPages();
    } catch (err) {
      alert("Failed to delete page");
      console.error(err);
    }
  };

  const createPage = async () => {
    if (!newName) return;
    const path = newName.startsWith("/") ? newName : `/${newName}`;

    try {
      const initialData = { pageData: { content: [], root: { props: { title: newName } } }, published: false };
      const res = await fetch(`/api/page${path}`, {
        method: "POST",
        body: JSON.stringify(initialData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        let errorMessage = "Failed to create";
        try {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const err = await res.json();
            errorMessage = err.error || errorMessage;
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }
      setIsCreating(false);
      setNewName("");
      await fetchPages();
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  };

  const togglePublished = async (page: Page) => {
    try {
      const res = await fetch(`/api/page${page.path}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !page.published }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to toggle status");
      await fetchPages();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  const toggleRoot = async (page: Page) => {
    try {
      const res = await fetch(`/api/page${page.path}`, {
        method: "PATCH",
        body: JSON.stringify({ isRoot: !page.isRoot }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to toggle root status");
      await fetchPages();
    } catch (err) {
      alert("Failed to update root status");
      console.error(err);
    }
  };

  const handleRename = async () => {
    if (!isRenaming || !newName) return;
    const formattedPath = newName.startsWith("/") ? newName : `/${newName}`;
    
    try {
      const res = await fetch(`/api/page${isRenaming}`, {
        method: "PATCH",
        body: JSON.stringify({ newPath: formattedPath }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        let errorMessage = "Failed to rename";
        try {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const err = await res.json();
            errorMessage = err.error || errorMessage;
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }
      setIsRenaming(null);
      setNewName("");
      await fetchPages();
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  };

  const createUser = async () => {
    if (!newUsername || !newPassword) return;

    try {
      // For Better Auth, we should use the sign-up or a specialized admin function
      // Since we want to manage users from dashboard, we might need to use Better Auth's admin plugin
      // For now, let's just keep the API call but it needs to be updated to match the new schema
      // Actually, Better Auth handles users differently.
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email: newUsername, password: newPassword, name: newUsername }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }
      setIsCreatingUser(false);
      setNewUsername("");
      setNewPassword("");
      await fetchUsers();
    } catch (err: any) {
      alert(err.message);
      console.error(err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    }
  };

  const deleteSubmission = async (id: string) => {
  if (!confirm("Are you sure you want to delete this submission?")) return;

  try {
    // Passes the targeted item id as a query param
    const res = await fetch(`/api/contact-submissions?id=${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete submission");
    
    // Refresh the list immediately after a successful delete
    await fetchSubmissions();
  } catch (err) {
    alert("Failed to delete submission");
    console.error(err);
  }
};

  const filteredPages = pages.filter(p => p.path.toLowerCase().includes(search.toLowerCase()));
  const filteredUsers = users.filter(u => (u.username || "").toLowerCase().includes(search.toLowerCase()));
  const filteredSubmissions = submissions.filter(s => 
  s.name.toLowerCase().includes(search.toLowerCase()) || 
  s.email.toLowerCase().includes(search.toLowerCase()) ||
  s.message.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500">Manage your website {activeTab === "pages" ? "pages and drafts" : "users and permissions"}.</p>
          </div>
          {activeTab === "pages" ? (
            <button 
              onClick={() => {
                setIsCreating(true);
                setNewName("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create Page
            </button>
          ) : (
            <button 
              onClick={() => {
                setIsCreatingUser(true);
                setNewUsername("");
                setNewPassword("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Create User
            </button>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 p-1 bg-gray-200 rounded-lg w-fit">
  <button
    onClick={() => setActiveTab("pages")}
    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
      activeTab === "pages" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
    }`}
  >
    Pages
  </button>
  <button
    onClick={() => setActiveTab("users")}
    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
      activeTab === "users" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
    }`}
  >
    Users
  </button>
  <button
    onClick={() => setActiveTab("submissions")}
    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
      activeTab === "submissions" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
    }`}
  >
    Submissions
  </button>
</div>

          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input
              type="text"
              placeholder={
  activeTab === "pages" 
    ? "Search pages..." 
    : activeTab === "users" 
    ? "Search users..." 
    : "Search submissions..."
}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  {activeTab === "pages" && (
    <table className="w-full text-left border-collapse">
       <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Page Details</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                        <span>Loading your pages...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <tr key={page.path} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <Link 
                            href={page.path} 
                            target="_blank" 
                            className="text-sm font-semibold text-blue-600 hover:underline"
                          >
                            {page.path}
                          </Link>
                          {page.isRoot && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded w-fit">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                              Root Page
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => togglePublished(page)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-inset transition-all ${
                            page.published 
                              ? "bg-green-50 text-green-700 ring-green-600/20 hover:bg-green-100" 
                              : "bg-yellow-50 text-yellow-700 ring-yellow-600/20 hover:bg-yellow-100"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${page.published ? "bg-green-600" : "bg-yellow-600"}`}></span>
                          {page.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(page.updateDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/admin/editor${page.path}`}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
                            title="Edit Content"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
                          </Link>
                          <button 
                            onClick={() => toggleRoot(page)}
                            className={`rounded-lg p-2 transition-all ${
                              page.isRoot 
                                ? "text-purple-600 bg-purple-50 hover:bg-purple-100" 
                                : "text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                            title={page.isRoot ? "Unmark as Root" : "Mark as Root"}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                          </button>
                          <button 
                            onClick={() => {
                              setIsRenaming(page.path);
                              setNewName(page.path);
                            }}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
                            title="Rename Page"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><path d="M18 9l-6 6"/><path d="M12 9l6 6"/></svg>
                          </button>
                          <button 
                            onClick={() => deletePage(page.path)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                            title="Delete Page"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                      {search ? "No pages match your search." : "No pages found. Start by creating one!"}
                    </td>
                  </tr>
                )}
              </tbody>
    </table>
  )}

  {activeTab === "users" && (
    <table className="w-full text-left border-collapse">
       <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                        <span>Loading users...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold">{user.username || (user as any).email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          title="Delete User"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                      {search ? "No users match your search." : "No users found."}
                    </td>
                  </tr>
                )}
              </tbody>
    </table>
  )}

{activeTab === "submissions" && (
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-bold uppercase tracking-wider text-gray-500">
        <th className="px-6 py-4">Sender</th>
        <th className="px-6 py-4">Message</th>
        <th className="px-6 py-4">Submitted At</th>
        <th className="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {loading ? (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
              <span>Loading submissions...</span>
            </div>
          </td>
        </tr>
      ) : filteredSubmissions.length > 0 ? (
        filteredSubmissions.map((sub) => (
          <tr key={sub.id} className="group hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
              <div className="text-sm font-semibold text-gray-900">{sub.name}</div>
              <div className="text-xs text-gray-500">{sub.email}</div>
              {sub.phone && <div className="text-xs text-gray-400">{sub.phone}</div>}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words">
              {sub.message}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {new Date(sub.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-right">
              <button 
                onClick={() => deleteSubmission(sub.id)}
                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all"
                title="Delete Submission"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
            {search ? "No submissions match your search." : "No submissions found."}
          </td>
        </tr>
      )}
    </tbody>
  </table>
)}
</div>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Create New Page</h3>
            <p className="text-sm text-gray-500 mb-6">Enter the path for your new page (e.g. /about-us).</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Page Path</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="/my-new-page"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 justify-end mt-8">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={createPage}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  Create Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
{isCreatingUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    {/* Changed container to a form element */}
    <form 
      onSubmit={(e) => {
        e.preventDefault(); // Prevents page reload
        // Additional JS check just to be safe
        if (newUsername.includes('@')) {
          createUser();
        }
      }}
      className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2">Create New User</h3>
      <p className="text-sm text-gray-500 mb-6">Enter details for the new administrative user.</p>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Email</label>
          <input 
            type="email" 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="john@example.com"
            required // <-- Forces the field to be filled out
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Password</label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required // <-- Ensures password isn't blank
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Role</label>
          <select 
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        
        <div className="flex gap-3 justify-end mt-8">
          <button 
            type="button" // <-- Explicitly set to button so it doesn't trigger form submission
            onClick={() => setIsCreatingUser(false)}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" // <-- Triggers form validation and onSubmit
            disabled={!newUsername.includes('@') || !newPassword} // <-- Disables button visually if invalid
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create User
          </button>
        </div>
      </div>
    </form>
  </div>
)}

      {/* Rename Modal */}
      {isRenaming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Rename Page</h3>
            <p className="text-sm text-gray-500 mb-6">Enter a new path for this page. This will update the URL.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">New Path</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 justify-end mt-8">
                <button 
                  onClick={() => setIsRenaming(null)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleRename}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
