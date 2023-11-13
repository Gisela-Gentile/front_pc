
import { DocumentComplete } from "@/app/interfaces/Document"
import Link from "next/link"
import CollaboratorAutorCard from "./CollaboratorAutorCard"
import styles from './DocumentCard.module.css'

export function DocumentCard({ document }: { document: DocumentComplete }) {
    return (
        
            <div className="card">                
                <div className="card-body">
                    <Link href={`document/${document.documentId}`} title={document.title}>
                        <h4 className="card-title">{document.title}</h4>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted"><label>Tipo:</label>{' '+ document.type}</h6>
                    <h6 className="card-subtitle mb-2 text-muted"><label>Creado:</label>{' '+ new Date(document.creationDate).toLocaleDateString()}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Autor del Documento:<CollaboratorAutorCard id={document.authorColDocument}/></h6>
                    <h6 className="card-subtitle mb-2 text-muted">Autor de la Ultima Revisión:<CollaboratorAutorCard id={document.authorColHistory}/></h6>
                    <div><label>visitas:</label>{document.totalVisits}</div>
                    <div className={styles.project}><label>Proyecto:</label><Link href='/project/[projectId]'as={`/project/${document.projectId}`} title={document.projectTitle}>{document.projectTitle}</Link></div>
                </div>                
            </div>
        
    )
}