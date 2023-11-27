"use client"
import { API_URL } from "@/config/constants";
import { User } from "@/app/interfaces/User";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsuarioCard({id}:{id: number}) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
        try {
          const res = await fetch(`${API_URL}/user/${id}/view`);
          const data = await res.json();
          setUser(data);
        } catch (error) {
            console.error('Error recuperando datos del Usuario', error);
        }
    };
    fetchUser();
  }, []);   
 
  return (<>{' '} {user && (<Link href={`/perfil/${user.userId}`}>{ user.username}</Link>)}</>)
}
