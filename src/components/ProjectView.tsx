
import { ProjectComplete } from "@/app/interfaces/Project";
import ListCollaboratorsProject from "./ListColaboratorsProject";
import ListDocumentsProject from "./ListDocumentsProject";
import Link from "next/link";

export default function ProjectView({ projectComplete }: { projectComplete: ProjectComplete }) {
    return (
        <section>
            <h1>{projectComplete.project.title}</h1>
            <div className="row">
                <div className="col-md-8">{projectComplete.project.description}</div>
                <div className="col-md-4">
                    <div className="">
                        <h5>{projectComplete.project.author.username}</h5>
                        <h5>{projectComplete.project.author.email}</h5>
                        <Link href={`/perfil/${projectComplete.project.author.userId}`}>Ver perfil publico</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Ficha del Proyecto</h3>
                    <h5>Descripción:</h5>
                    <p>{projectComplete.project.description}</p>
                    <h5>Fecha de Creación:</h5>
                    <p>{new Date(projectComplete.project.creationDate).toLocaleDateString()}</p>
                    <h5>Categoria:</h5>
                    <p>{projectComplete.project.category.name}</p>

                    <div>
                        <h5>Colaboradores:</h5>
                        {
                            projectComplete.collaborators.length > 0 ? (<ListCollaboratorsProject listCollaborators={projectComplete.collaborators} />
                            ) : 'No posee colaboradores en la actualidad.'
                        }
                    </div>
                    <div>
                        <h5>Documentos:</h5>
                        {
                            projectComplete.documents.length > 0 ? (<ListDocumentsProject listDocuments={projectComplete.documents} />
                            ) : 'No posee documentos en la actualidad.'
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}
