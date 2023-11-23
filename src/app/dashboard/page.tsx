"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Suspense, useEffect, useState } from "react";
import Initial from "./components/Initial";
import { useProjects } from "../context/ProjectContext";
import Breadcrumbs from "./components/Breadcrumbs";
import RecentProjects from "./components/RecentProjects";
import ViewListProjects from "./components/ViewListProjects";

export default function DashboardPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const { projectsOwner,
          projectsCollaborator,
          loadProjectsOwner,
          loadProjectsCollaborator
  } = useProjects();

useEffect(() => {
  if (!user) {    
    router.push('/')
  }    
}, [token,user]);
  
useEffect(() => { loadProjectsOwner()},[]);
useEffect(() => { loadProjectsCollaborator()},[]);

  return (
    <section className="">
      <Breadcrumbs breadcrumbs={[
        { label: 'Inicio', href: '/dashboard',active: true, }]}/>
      <hr/>        
        <Suspense fallback={<div>Loading...</div>}>
         <RecentProjects/>        
        </Suspense>
    </section>    
  );
}