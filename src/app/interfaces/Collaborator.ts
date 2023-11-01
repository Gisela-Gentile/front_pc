import { Project } from "./Project";
import { User } from "./User";

export type Collaborator = {
    project: Project,
    user: User,
    rol: ['COLLABORATOR', 'OWNER'],
    collaboratorId:string,
}

export type ListCollaborators = { 
    collaborator: Collaborator[]
}
