import { Category } from "./Category";
import { Collaborator } from "./Collaborator";
import { User } from "./User";

export type Project = {
  title: string,
  description:string
  author: User,
  category: Category,
  projectId: string, 
  creationDate: string, 
}

export type ProjectComplete = {
  collaborators: Collaborator[],
  documents: Document[]
} & Partial<Project>;
{/*export type CreateDocument = Omit<Document, "id" | "createdAt" | "updatedAt">;

export type UpdateDocument = Partial<CreateDocument>;*/}