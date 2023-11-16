"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Initial from "./components/Initial";
import { useProjects } from "../context/ProjectContext";
import ProjectForm from "./components/ProjectForm";


export default function DashboardPage() {
  const { token, user } = useAuth();
  console.log(`token: ${token}`);
  console.log(`user: ${user}`);
  const [estado, setEstado] = useState("init");
  const router = useRouter();
  const {projectsOwner,projectsCollaborator,loadProjectsOwner,loadProjectsCollaborator } = useProjects();
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [token,user]);
  
  useEffect(() => { loadProjectsOwner(); },[]);
  useEffect(() => { loadProjectsCollaborator(); },[]);
  
  
  return (
    <div className="container">
    <div className="row">
        <div id="sidebar" className="col-md-3" >
          <Nav />
        </div>
        <div id="content" className="col-md-9" style={{ ['borderLeft' as any]: "1px solid #ccc" }}>
        
        {estado ==="init" ? ( <Initial/>  ):''}
        <ProjectForm/>
        </div>
      </div> 
    </div>
  );
}