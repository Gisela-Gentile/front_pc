import { DocumentComplete } from "@/app/interfaces/Document"
import Link from "next/link"
import CollaboratorAutorCard from "./CollaboratorAutorCard"
import styles from './DocumentCard.module.css'
import { truncate } from "@/lib/utils";

export function DocumentCard({ document }: { document: DocumentComplete }) {
    return (
        <div className="card">                
            <div className="card-body">
                <Link href={`document/${document.documentId}`} title={document.title}>
                    <h4 className="card-title">{truncate(document.title,30)}</h4>
                </Link>
                {/*<h6 className="card-subtitle mb-2 text-muted"><strong>Tipo:</strong>{' '+ document.type}</h6>*/}
                <h6 className="card-subtitle mb-2 text-muted"><strong>Creado:</strong>{' '+ new Date(document.creationDate).toLocaleDateString()}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Autor del Documento:<CollaboratorAutorCard id={document.authorColDocument}/></h6>
                <h6 className="card-subtitle mb-2 text-muted">Autor de la Ultima Revisión:<CollaboratorAutorCard id={document.authorColHistory}/></h6>
                <div><strong>visitas:</strong>{document.totalVisits}</div>
                <div className={styles.project}><strong>Proyecto:</strong><Link href='/project/[projectId]'as={`/project/${document.projectId}`} title={document.projectTitle}>{truncate(document.projectTitle,35)}</Link></div>
            </div>                
        </div>
    );
}
