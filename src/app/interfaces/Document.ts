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
  documentId: number,
  projectTitle:string,
  projectId: number,
  creationDate: string,
  totalVisits: number,  
  authorColDocument: number,
  historyId: number,
  title:string,
  type:string,
  content:string,
  authorColRevision: number,
  historyVisits:number
  creationDateRevision: string,  
}