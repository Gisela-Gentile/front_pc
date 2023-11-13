import { Project } from "./Project";
import { User } from "./User";

export type Collaborator = {    
    rol: ['COLLABORATOR', 'OWNER'],
    collaboratorId:number,
    project: Project,
    user: User,
}