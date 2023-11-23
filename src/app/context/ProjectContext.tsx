"use client";
import { createContext, useState, useContext } from "react";
import { CreateProject, UpdateProject, Project } from "@/app/interfaces/Project";
import { API_URL } from "@/config/constants";
import { useAuth } from "./AuthContext";


export const ProjectContext = createContext<{
  projectsOwner: Project[];
  projectsCollaborator: Project[];
  loadProjectsOwner: () => Promise<void>;
  loadProjectsCollaborator: () => Promise<void>;
  createProject: (project: CreateProject) => Promise<any>;
  deleteProject: (id: number) => Promise<any>;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProject: (id: number, project: UpdateProject) => Promise<any>;
}>({
  projectsOwner: [],
  projectsCollaborator: [],
  loadProjectsOwner: async () => {},
  loadProjectsCollaborator: async () => {},
  createProject: async (project: CreateProject) => {},
  deleteProject: async (id: number) => {},
  selectedProject: null,
  setSelectedProject: (project: Project | null) => {},
  updateProject: async (id: number, project: UpdateProject) => {},
});

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
  throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const [projectsOwner, setProjectsOwner] = useState<Project[]>([]);
  const [projectsCollaborator, setProjectsCollaborator] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  

  async function loadProjectsOwner():Promise<void> {
    const res = await fetch(`${API_URL}/project/my-projects`, {
      method: 'GET', 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,},
      }
    );
    const data = await res.json();
    setProjectsOwner(data.data);
  }

  async function loadProjectsCollaborator() {
    const res = await fetch(`${API_URL}/project/my-collaboration-projects`, {
      method: 'GET', 
      headers: { 
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`,},});
    const data = await res.json();
    setProjectsCollaborator(data.data);
  }

  async function createProject( project: CreateProject):Promise<any> {
    try {
      const response = await fetch(`${API_URL}/project/add`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
      if (response.status===201){
        const newProject = await response.json();
        setProjectsOwner([...projectsOwner, newProject]);
      }      
      return response.status  
    } catch(error:any){
        return error        
    }
  }
 

  async function deleteProject(id: number):Promise<any> {
    try {
        const response = await fetch(`${API_URL}/project/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProjectsOwner(projectsOwner.filter((project) => project.projectId !== id));
      return response.status
    } catch (error: any){
       return { error };  
    }
  }

  async function updateProject(id: number, project: UpdateProject):Promise<any> {
    try {
      const response = await fetch(`${API_URL}/project/${id}/edit`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
          'Authorization':`Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProjectsOwner(
        projectsOwner.map((project) => (
          project.projectId === id ? data.projectChanged : project)
        )
      );
      return response.status;
    } catch (error: any){
        return { error };  
    }
  }

  return (
    <ProjectContext.Provider value= {{
        projectsOwner,
        projectsCollaborator,
        loadProjectsOwner,
        loadProjectsCollaborator,
        createProject,
        deleteProject,
        selectedProject,
        setSelectedProject,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
