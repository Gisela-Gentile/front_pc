
import { ProjectComplete } from "@/app/interfaces/Project";
import ListCollaboratorsProject from "./ListColaboratorsProject";
import ListDocumentsProject from "./ListDocumentsProject";
import Link from "next/link";
import styles from '@/app/page.module.css';
import owen from '@/components/ProjectView.module.css';

export default function ProjectView({ projectComplete }: { projectComplete: ProjectComplete }) {
    const {project, collaborators,documents} = projectComplete;
    return (
        <div className="container py-3">
            <div className="offset-md-2 col-md-8">
                <div className="row">
                    <div className="col-12 page-title py-5 mt-5">
                        <h1 className={styles.title}>{project.title}</h1>
                    </div>
                    <div className="col-12">
                        <div className={styles.description}>
                            <p className={owen.paragraphs}>{project.description}</p>
                        </div>
                    </div>
                </div>
                <div className="row g-3 my-4">    
                    <div className="col-4">
                    {   project.author && 
                        <div className="text-center border rounded p-4">
                            <h5>Autor</h5>
                            <p>{project.author.username}</p>
                        </div>
                    }
                    </div>    
                    <div className="col-4">
                    {   project.author && 
                        <div className="text-center border rounded p-4">
                            <h5>Contacto</h5>
                            <p>{project.author.email}</p>
                        </div>
                    }
                    </div>
                    <div className="col-4">
                    {   project.author && 
                        <div className="text-center border rounded p-4">
                            <h5>Perfil Público</h5>
                            <p><Link href={`/perfil/${project.author.userId}`}>Ir al perfil </Link></p>
                        </div>
                    }
                    </div>
                    <div className="col-6">        
                    {   project.creationDate && 
                        <div className="text-center border rounded p-4">
                            <h5>Fecha de Creación</h5>
                            <p>{new Date(project.creationDate).toLocaleDateString()}</p>
                        </div>
                    }
                    </div>
                    <div className="col-6">
                    {   project.category && 
                        <div className="text-center border rounded p-4">
                            <h5>Categoría</h5>
                            <p>{project.category.name}</p>
                        </div>
                    }
                </div>
                </div>    
                <div className="col-12 my-4">
                    <h5>Colaboradores del Proyecto</h5>
                    {
                        projectComplete.collaborators.length > 0 ? (
                        <ListCollaboratorsProject listCollaborators={projectComplete.collaborators} />
                        ) :
                        <p>No posee colaboradores en la actualidad.</p>
                    }
                </div>
                <div className="col-12 my-4">
                    <h5>Documentos incluidos en el Proyecto</h5>
                    {
                        projectComplete.documents.length > 0 ? (
                        <ListDocumentsProject listDocuments={projectComplete.documents} />
                        ) :
                        <p>No posee documentos en la actualidad.</p>
                    }
                </div>
                
            </div>
        </div>
    )
}
