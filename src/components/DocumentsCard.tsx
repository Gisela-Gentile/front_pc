
import { DocumentComplete } from "@/app/interfaces/Document"

export function DocumentsCard({ document }: { document: DocumentComplete }) {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{document.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted"><label>Tipo:</label>{document.type}</h6>
                <h6 className="card-subtitle mb-2 text-muted"><label>Creado:</label>{new Date(document.creationDate).toLocaleDateString()}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Author del Documento: {document.authorDocument}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Author de la Revision: {document.authorRevision}</h6>
                <div><label>visitas:</label>{document.visits}</div>
            </div>
        </div>
    )
}
