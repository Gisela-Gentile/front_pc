
import { Document } from "@/app/interfaces/Document"
import { ProjectsCard } from "./ProjectsCard";


export function DocumentsCard({ document }:{document:Document}) {
    return (        
        
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{document.documentId}</h4>
                <h6 className="card-subtitle mb-2 text-muted"><label>Tipo:</label>{document.type}</h6>
                <h6 className="card-subtitle mb-2 text-muted"><label>Creado:</label>{new Date(document.creationDate).toLocaleDateString()}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Author: {''}</h6>
                <p className="card-text">{'HolA'}</p>
                <div><label>visitas:</label>{document.visits}</div>
              

            </div>
        </div>
    )
}
