"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase";
import { useDocument } from "@/context/DocumentContext";

type Document = {
  id: string;
  file_name: string;
  created_at: string;
};

export default function DocumentList() {
  const supabase = useSupabase();
  const { selectedDocument, setSelectedDocument } = useDocument();
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    async function fetchDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setDocuments(data);
    }

    fetchDocuments();
  }, [supabase]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Documents</h2>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
            key={doc.id}
            onClick={() => setSelectedDocument(doc.id)}
            className={`p-4 rounded-lg shadow border cursor-pointer transition ${
              selectedDocument === doc.id
                ? "bg-blue-100 border-blue-500"
                : "bg-white"
            }`}
          >
              <p className="font-semibold">{doc.file_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(doc.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}