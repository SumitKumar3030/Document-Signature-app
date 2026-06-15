"use client";

import { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  FileText,
  Upload,
  Link2,
  CheckCircle,
  Clock,
  File,
  LayoutDashboard,
  Settings,
  LogOut,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

interface Document {
  _id: string;
  originalName: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await api.get("/docs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocuments(res.data.documents || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDocuments();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadDocument = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("document", file);

      const res = await api.post("/docs/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Optimistically append new document to state instead of forcing a full page reload
      if (res.data.document) {
        setDocuments((prev) => [res.data.document, ...prev]);
      } else {
        // Fallback catch if backend structure just confirms upload without returning object
        const updatedDocs = await api.get("/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(updatedDocs.data.documents || []);
      }

      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const generateShareLink = async (documentId: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/share/generate",
        { documentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await navigator.clipboard.writeText(res.data.shareLink);

      setCopiedId(documentId);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to generate share link");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Status Metrics Calculation
  const totalDocs = documents.length;
  const completedDocs = documents.filter(
    (d) =>
      d.status.toLowerCase() === "signed" ||
      d.status.toLowerCase() === "completed",
  ).length;
  const pendingDocs = totalDocs - completedDocs;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Sidebar Component */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl px-2">
            <FileText className="h-6 w-6" />
            <span>DocSign</span>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg font-medium text-sm transition"
            >
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium text-sm transition"
            >
              <File className="h-4 w-4" /> My Documents
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-gray-600 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-medium text-sm transition"
            >
              <Settings className="h-4 w-4" /> Settings
            </a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 hover:text-red-600 px-4 py-2.5 rounded-lg font-medium text-sm transition w-full"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </aside>

      {/* Main Command Window */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Header Row */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Workspace Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage, upload, and dispatch your legal agreements.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <File className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Documents
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                {totalDocs}
              </h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Awaiting Action
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                {pendingDocs}
              </h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Completed</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">
                {completedDocs}
              </h3>
            </div>
          </div>
        </div>

        {/* Clean Interactive Upload Area */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Upload New Contract
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <label className="flex-1 flex items-center justify-between border border-dashed border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/20 px-4 py-3 rounded-lg cursor-pointer transition group">
              <div className="flex items-center gap-3">
                <Upload className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm text-gray-600 font-medium max-w-[200px] sm:max-w-md truncate">
                  {file ? file.name : "Select or drop a PDF file..."}
                </span>
              </div>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {file && (
                <span className="text-xs text-gray-400 bg-white border px-2 py-0.5 rounded shadow-sm">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              )}
            </label>
            <button
              disabled={!file || uploading}
              onClick={uploadDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-lg transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Upload PDF
            </button>
          </div>
        </div>

        {/* Documents Table Interface */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Recent Documents</h2>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12 px-4">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No documents uploaded yet
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Get started by selecting a secure file above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3.5">Document Title</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Created At</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {documents.map((doc) => {
                    const isCompleted =
                      doc.status.toLowerCase() === "signed" ||
                      doc.status.toLowerCase() === "completed";
                    return (
                      <tr
                        key={doc._id}
                        className="hover:bg-gray-50/40 transition"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2.5 max-w-xs sm:max-w-md">
                          <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                          <a
                            href={`/dashboard/document/${doc._id}`}
                            className="truncate text-blue-600 hover:underline"
                          >
                            {doc.originalName}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              isCompleted
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-amber-500"}`}
                            />
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(doc.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => generateShareLink(doc._id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 bg-white px-3 py-1.5 rounded-md shadow-sm transition"
                          >
                            {copiedId === doc._id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                                <span className="text-emerald-600">
                                  Copied!
                                </span>
                              </>
                            ) : (
                              <>
                                <Link2 className="h-3.5 w-3.5" />
                                <span>Share Link</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
