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
  title: string,
  description:string,
  author: User,
  category: Category,
  projectId: number, 
  creationDate: string, 
}