"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function NewProyect() {
  const { token, user } = useAuth();
  console.log(`token: ${token}`);
  console.log(`user: ${user}`);
  const router = useRouter();
  
  
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [token,user])
  
  return (
    <div>
        <h1>aca creo nuuevo proyecto</h1>
    </div>
  )
}
