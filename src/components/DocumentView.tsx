
import { DocumentComplete } from "@/app/interfaces/Document";
import styles from '@/app/page.module.css';
import owen from '@/components/DocumentView.module.css';
import CollaboratorAutorCard from "./CollaboratorAutorCard";
import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";

export default function DocumentView({ documentComplete }: { documentComplete: DocumentComplete }) {

    return (
        <article>
            <div className="row">
                <div className="col-12 page-title py-5">
                    <h1 className={styles.title}>{documentComplete.title}</h1>
                </div>
                <div className="col-12">
                    <div className={styles.description}>
                        <p className={owen.paragraphs}>{documentComplete.content}</p>
                    </div>
                </div>
            </div>
            <div className="row g-3 my-4">    
                <div className="col-4">
                {   documentComplete.authorColDocument && 
                    <div className="text-center border rounded p-4">
                        <h5>Autor del Documento</h5>
                        <p><CollaboratorAutorCard id={documentComplete.authorColDocument} /></p>
                    </div>
                }
                </div>    
                <div className="col-4">
                {   documentComplete.type && 
                    <div className="text-center border rounded p-4">
                        <h5>Tipo de Documento</h5>
                        <p>{documentComplete.type}</p>
                    </div>
                }
                </div>
                <div className="col-4">
                {   documentComplete.totalVisits && 
                    <div className="text-center border rounded p-4">
                        <h5>Cantidad de Visualizaciones</h5>
                        <p>{documentComplete.totalVisits}</p>
                    </div>
                }
                </div>
                <div className="col-4">        
                {   documentComplete.creationDate && 
                    <div className="text-center border rounded p-4">
                        <h5>Fecha de Creación</h5>
                        <p>{new Date(documentComplete.creationDate).toLocaleDateString()}</p>
                    </div>
                }
                </div>
                <div className="col-4">        
                {   documentComplete.creationDateHistory && 
                    <div className="text-center border rounded p-4">
                        <h5>Ultima Revisión</h5>
                        <p>{new Date(documentComplete.creationDateHistory).toLocaleDateString()}</p>
                    </div>
                }
                </div>
            </div>
        </article>
    );
}
