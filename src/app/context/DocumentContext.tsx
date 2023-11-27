"use client";

import { createContext, useState, useContext } from "react";
import { CreateDocument, UpdateDocument, Document, DocumentComplete } from "@/app/interfaces/Document";
import { useAuth } from "./AuthContext";
import { useProjects } from "./ProjectContext";
import { API_URL } from "@/config/constants";

export const DocumentContext = createContext<{
  createDocument: (document: CreateDocument) => Promise<any>;
  deleteDocument: (id: number) => Promise<any>;
  selectedDocument: DocumentComplete | null;
  setSelectedDocument: (documentComplete: DocumentComplete | null) => void;
  updateDocument: (id: number, document: UpdateDocument) => Promise<any>;
}>({
  createDocument: async (document: CreateDocument) => {},
  deleteDocument: async (id: number) => {},
  selectedDocument: null,
  setSelectedDocument: (documentComplete: DocumentComplete | null) => {},
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
  const [selectedDocument, setSelectedDocument] = useState<DocumentComplete | null>(null);

  async function createDocument(document: CreateDocument) {
    try {
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
      const response = await fetch(`${API_URL}/documents/id`, {
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
  }

  async function updateDocument(id: number, document: UpdateDocument) {
    try {
      const response = await fetch(`${API_URL}/project/${selectedProject?.projectId}/edit/${id}`,{
        method: "PUT",
        body: JSON.stringify(document),
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
      const data = await response.json();
      return response.status
    } catch (e){
        return e
    }    
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
