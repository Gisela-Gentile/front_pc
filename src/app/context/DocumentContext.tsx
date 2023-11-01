"use client";

import { createContext, useState, useContext } from "react";
import { CreateDocument, UpdateDocument, Document } from "@/app/interfaces/Document";

export const DocumentContext = createContext<{
  documents: Document[];
  loadDocuments: () => Promise<void>;
  createDocument: (Document: CreateDocument) => Promise<void>;
  deleteDocument: (id: number) => Promise<void>;
  selectedDocument: Document | null;
  setSelectedDocument: (document: Document | null) => void;
  updateDocument: (id: number, document: UpdateDocument) => Promise<void>;
}>({
  documents: [],
  loadDocuments: async () => {},
  createDocument: async (document: CreateDocument) => {},
  deleteDocument: async (id: number) => {},
  selectedDocument: null,
  setSelectedDocument: (document: Document | null) => {},
  updateDocument: async (id: number, document: UpdateDocument) => {},
});

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
};

export const DocumentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [Documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  async function loadDocuments() {
    const res = await fetch("/api/Documents");
    const data = await res.json();
    setDocuments(data);
  }

  async function createDocument(document: CreateDocument) {
    const res = await fetch("/api/documents", {
      method: "POST",
      body: JSON.stringify(document),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newDocument = await res.json();
    setDocuments([...documents, newDocument]);
  }

  async function deleteDocument(id: number) {
    const res = await fetch("/api/Documents/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setDocuments(documents.filter((document) => document.id !== id));
  }

  async function updateDocument(id: number, document: UpdateDocument) {
    const res = await fetch("/api/Documents/" + id, {
      method: "PUT",
      body: JSON.stringify(document),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setDocuments(documents.map((document) => (document.id === id ? data : document)));
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loadDocuments,
        createDocument,
        deleteDocument,
        selectedDocument,
        setSelectedDocument,
        updateDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
