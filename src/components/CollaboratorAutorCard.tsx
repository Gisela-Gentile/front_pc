"use client"
import { Collaborator } from "@/app/interfaces/Collaborator";
import { API_URL } from "@/config/constants";
import UsuarioCard from "./UsuarioCard";
import { useEffect, useState } from "react";


export default function CollaboratorAutorCard({id}:{id: number}) {
  const [collaborator,setCollaborator] = useState<Collaborator>();

  useEffect(() => {
    const fetchCollaborator = async () => {
        try {
          const res = await fetch(`${API_URL}/collaborator/${id}/view`);
          const data = await res.json();
          setCollaborator(data);
        } catch (error) {
            console.error('Error recuperando datos del colaborador', error);
        }
    };
    fetchCollaborator();
  }, []);  
  
  
  return (<>{collaborator && <UsuarioCard id={ collaborator.user.userId}/>}</>)
}
