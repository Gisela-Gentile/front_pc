import { Project } from "./Project";
import { User } from "./User";

export type Collaborator = {
    
    rol: ['COLLABORATOR', 'OWNER'],
    collaboratorId:string,
    project: Project,
    user: User,
}
{/*
export type ListCollaborators = { 
    collaborator: Collaborator[]
}*/}
