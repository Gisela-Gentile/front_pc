import { Collaborator } from "./Collaborator";
import { Project } from "./Project";

export type CreateDocument = {
  title: string,
  content: string,
  messaggesLog:string
}
export type UpdateDocument = CreateDocument;

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
  creationDate: string,
  creationDateHistory: string,
  historyId: number,
  documentId: number,
  authorColDocument: number,
  authorColHistory: number,
};
      
export type DocumentComplete = ItemLastDocument & {
  projectTitle:string,
  projectId: number,
  totalVisits: number,  
  type:string,
  content:string,
  historyVisits:number,  
}  