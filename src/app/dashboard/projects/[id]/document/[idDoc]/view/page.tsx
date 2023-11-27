"use client"
import { useAuth } from "@/app/context/AuthContext";
import { useProjects } from "@/app/context/ProjectContext";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { DocumentComplete } from "@/app/interfaces/Document";
import DocumentView from "@/components/DocumentView";
import { API_URL } from "@/config/constants";
import { capitalize } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { decode,} from 'html-entities';
import EditDocumentButton from "@/app/dashboard/components/edit-document-button";

const modules = {
  toolbar: false,
};

{/* aca traer documento completo ya tengo document pero deberia traer revisiones...*/}
export default function ViewDocumentPage() {
    const router = useRouter();
    const { token, user } = useAuth();
    const {selectedProject}= useProjects();    
    const {idDoc} = useParams();
    const [document, setDocument] = useState<DocumentComplete>();
                
    async function fetchDocumentComplete() {
      try {
        const response = await fetch(`${API_URL}/document/${idDoc}/view`);
        ;
        setDocument(await response.json())
      }catch (e){
        console.log("Couldn't make API call:/n",e);
      }
    }

    useEffect(() => {
      if (!user) {
        router.push('/')
      }      
    }, [token,user])
         
    useEffect(()=>{fetchDocumentComplete()},[idDoc])

    return (
        <section>
          <Breadcrumbs breadcrumbs={[
            { label: 'Inicio', href: '/dashboard',},
            { label: 'Proyectos', href: '/dashboard/projects',},
            { label: `${selectedProject && capitalize(selectedProject?.title)}`, href: `/dashboard/projects/${selectedProject?.projectId}`,},
            { label: `${document && capitalize(document?.title)}`, href: `/dashboard/projects/${selectedProject?.projectId}/document/${idDoc}`,active:true }]}/>
          <hr/>
          <EditDocumentButton/>
          {/*<DeleteProjectButton/>*/}
          <article>
            <div className="row">
                <div className="col-12 page-title py-5">
                    <h1 className="">{document?.title}</h1>
                </div>                
            </div>
            <ReactQuill modules={modules} readOnly={true} theme="snow" value={decode(document?.content)} />
          </article>  

        </section>
    );
}