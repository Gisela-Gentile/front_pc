"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProjectsPage() {
    const { token, user } = useAuth();
    console.log(`token: ${token}`);
    console.log(`user: ${user}`);

    const router = useRouter();
    console.log(`router: ${router}`);
  
    useEffect(() => {
      if (!user) {
        router.push('/')
      }
    }, [])
  
    return (
    <div>
      PRojects page to show projects and functionalitys
      Cargo los proyectos del usuario
    </div>
  )
}
