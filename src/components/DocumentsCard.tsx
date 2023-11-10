
import { DocumentComplete } from "@/app/interfaces/Document"
import Link from "next/link"
import UsuarioCard from "./UsuarioCard"

export function DocumentsCard({ document }: { document: DocumentComplete }) {
    return (
        
            <div className="card">
                
                <div className="card-body">
                <Link href={`document/${document.documentId}`} title={document.title}><h4 className="card-title">{document.title}</h4></Link>
                    <h6 className="card-subtitle mb-2 text-muted"><label>Tipo:</label>{document.type}</h6>
                    <h6 className="card-subtitle mb-2 text-muted"><label>Creado:</label>{new Date(document.creationDate).toLocaleDateString()}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Author del Documento:<UsuarioCard id={document.authorDocument}/></h6>
                    <h6 className="card-subtitle mb-2 text-muted">Author de la Revision:<UsuarioCard id={document.authorRevision}/></h6>
                    <div><label>visitas:</label>{document.totalVisits}</div>
                    <div><label>Proyecto:</label><Link href='/project/[projectId]'as={`/project/${document.projectId}`}>{document.projectTitle}</Link></div>
                </div>
                
            </div>
        
    )
}
