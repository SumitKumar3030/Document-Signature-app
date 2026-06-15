"use client";

import { useState } from "react";
import api from "../../../lib/axios";
import { useParams } from "next/navigation";

export default function DocumentPage() {
  const params = useParams();

  const documentId =
    params.id as string;

  const [signerName, setSignerName] =
    useState("");

  const [downloadUrl, setDownloadUrl] =
    useState("");

  const signPdf = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.post(
        "/pdf/finalize",
        {
          documentId,
          signerName,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setDownloadUrl(
        res.data.pdfUrl
      );
    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Sign PDF
      </h1>

      <input
        type="text"
        value={signerName}
        onChange={(e) =>
          setSignerName(
            e.target.value
          )
        }
        placeholder="Enter your name"
        className="border p-3 rounded w-full"
      />

      <button
        onClick={signPdf}
        className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
      >
        Sign PDF
      </button>

      {downloadUrl && (
        <div className="mt-6">
          <a
            href={downloadUrl}
            target="_blank"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Download Signed PDF
          </a>
        </div>
      )}
    </div>
  );
}