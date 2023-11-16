import { Category } from "./Category";
import { Collaborator } from "./Collaborator";
import { ItemLastDocument } from "./Document";
import { User } from "./User";

export type ProjectComplete = {
  project: Project,
  collaborators: Collaborator[],
  documents: ItemLastDocument[],
}
export type Project = {
  projectId: number, 
  title: string,
  description:string,
  author: User,
  category?: Category,  
  creationDate: string, 
}

{/*export type CreateProject = Omit<Project, "projectId" | "creationDate">;*/}

export type CreateProject = {
  title: string,
  description:string,
  author?: User,
  category: string,    
}

export type UpdateProject = CreateProject;
  