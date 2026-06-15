"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../lib/axios";

interface DocumentData {
  _id: string;
  originalName: string;
  status: string;
  createdAt: string;
  shareToken?: string;
}

export default function SignPage() {
  const params = useParams();
  const token = params.token as string;

  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await api.get(`/share/${token}`);

        setDocument(res.data.document);
        setPdfUrl(res.data.pdfUrl);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDocument();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="p-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-10">
        <h1>Invalid or Expired Link</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Sign Document
      </h1>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-2">
          {document.originalName}
        </h2>

        <p className="text-gray-500 mb-6">
          Status: {document.status}
        </p>

        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="900"
            className="border rounded"
            title="PDF Viewer"
          />
        ) : (
          <p className="text-red-500">
            PDF URL not found.
          </p>
        )}
      </div>
    </div>
  );
}