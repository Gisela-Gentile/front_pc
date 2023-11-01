import { Collaborator } from "./Collaborator";
import { Project } from "./Project";

export type Document = {
  documentId: number,
  type: string,
  creationDate: string,
  lastHistoryId: string,
  visits: number,
  project: Project,
  author: Collaborator,
}
export type History = {
  title:string,
  content:string,
  messagesLog:string,
  visits: number,
  historyId:string,
  creationDate: string,
}

export type DocumentComplete = {
  document:Document,
  lastVersion:History
}
