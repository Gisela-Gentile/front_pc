"use client";

import { createContext, useState, useContext } from "react";
import { CreateDocument, UpdateDocument, Document } from "@/app/interfaces/Document";
import { useAuth } from "./AuthContext";
import { useProjects } from "./ProjectContext";
import { API_URL } from "@/config/constants";

export const DocumentContext = createContext<{
  createDocument: (Document: CreateDocument) => Promise<any>;
  deleteDocument: (id: number) => Promise<any>;
  selectedDocument: Document | null;
  setSelectedDocument: (document: Document | null) => void;
  updateDocument: (id: number, document: UpdateDocument) => Promise<any>;
}>({
  createDocument: async (document: CreateDocument) => {},
  deleteDocument: async (id: number) => {},
  selectedDocument: null,
  setSelectedDocument: (document: Document | null) => {},
  updateDocument: async (id: number, document: UpdateDocument) => {},
});

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
};

export const DocumentProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const { selectedProject} = useProjects();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  {/*async function loadDocuments() {
    const res = await fetch("/api/Documents");
    const data = await res.json();
    setDocuments(data);
  }*/}

  async function createDocument(document: CreateDocument) {
    try {
        console.log(selectedProject?.projectId);
        const response = await fetch(`${API_URL}/project/${selectedProject?.projectId}/add/document`,{
          method: "POST",
          body: JSON.stringify(document),
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`,
          },
        });
        console.log(response.status);
        return response.status  
    } catch(error:any){
      return error        
    }
  }

  async function deleteDocument(id: number) {
    try {
      const response = await fetch(`${API_URL}/Documents/id`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
    return response.status
    } catch (error: any){
       return { error };  
    }
    {/*setDocuments(documents.filter((document) => document.id !== id));*/}
  }

  async function updateDocument(id: number, document: UpdateDocument) {
    const res = await fetch("Documents/" + id, {
      method: "PUT",
      body: JSON.stringify(document),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    {/*setDocuments(documents.map((document) => (document.id === id ? data : document)));*/}
  }

  return (
    <DocumentContext.Provider
      value={{
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
