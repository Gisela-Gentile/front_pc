"use client";
import { useDocument } from "@/app/context/DocumentContext";
import LoadingDots from "@/components/Icons/LoadingDots";
import { API_URL } from "@/config/constants";
import { notFound, useParams, useRouter } from "next/navigation";
import {useState } from "react";

export default function EditDocumentButton() {
  const router = useRouter();
  const {id,idDoc} = useParams();
  const {setSelectedDocument} = useDocument();
  
  
  const handleClick = async () => {
    const response = await fetch(`${API_URL}/document/${idDoc}/view`);
    if (response.status===200){
      setSelectedDocument(await response.json());
      router.push(`/dashboard/projects/${id}/document/${idDoc}/edit`)
    } else {
      setSelectedDocument(null);
      notFound();
    }           
  }

  return (  
      <button
        onClick={handleClick}  
        className="rounded border bg-black px-4 py-1 text-center text-white m-4"
      >Editar Documento</button>
    );
}