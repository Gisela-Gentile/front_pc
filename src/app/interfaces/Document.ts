import { Collaborator } from "./Collaborator";
import { Project } from "./Project";

export type Document = {
  documentId: number,
  type: string,
  creationDate: string,
  lastHistoryId: number,
  visits: number,
  project: Project,
  author: Collaborator,
}

export type ItemLastDocument = {
  title:string,
  creationDateDocument: string,
  creationDateHistory: string,
  historyId: number,
  documentId: number,
  authorDocument: number,
  authorRevision: number,
};
      
export type DocumentComplete = {
  title:string,
  creationDate: string,
  historyId: number,
  documentId: number,
  authorDocument: number,
  authorRevision: number,
  content:string,
  visits: number,  
  projectId: number,
  type:string,  
}