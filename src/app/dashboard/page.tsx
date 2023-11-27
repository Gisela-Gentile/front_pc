"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Suspense, useEffect,} from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import RecentProjects from "./components/RecentProjects";


export default function DashboardPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  
useEffect(() => {
  if (!user) {    
    router.push('/')
  }    
}, [token,user]);

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