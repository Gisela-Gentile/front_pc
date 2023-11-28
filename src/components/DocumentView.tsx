"use client"

import { DocumentComplete } from "@/app/interfaces/Document";
import styles from '@/app/page.module.css';
import CollaboratorAutorCard from "./CollaboratorAutorCard";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { decode, } from 'html-entities';
import ListComment from "./ListComment";
import FormAddComment from "./FormAddComment";
import parse from 'html-react-parser'

// const modules = {
//     toolbar: false,
// };



export default function DocumentView({ documentComplete }: { documentComplete: DocumentComplete }) {
    return (

        <div className="">
            <div className="row">
                <div className="col-4">
                    <ul className="list-group">
                        {documentComplete.authorColDocument &&
                            <li className="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
                                Autor del documento
                                <span className="badge bg-primary rounded-pill"><CollaboratorAutorCard id={documentComplete.authorColDocument} /></span>
                            </li>}
                        {documentComplete.type &&
                            <li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                                Tipo de documento
                                <span className="badge bg-primary rounded-pill">{documentComplete.type}</span>
                            </li>}
                        {documentComplete.totalVisits &&
                            <li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
                                Visualizaciones
                                <span className="badge bg-primary rounded-pill">{documentComplete.totalVisits}</span>
                            </li>}
                        {documentComplete.creationDate &&
                            <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                                Creación
                                <span className="badge bg-primary rounded-pill">{new Date(documentComplete.creationDate).toLocaleDateString()}</span>
                            </li>}
                        {documentComplete.creationDateHistory &&
                            <li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center">
                                Última revisión
                                <span className="badge bg-primary rounded-pill">{new Date(documentComplete.creationDateHistory).toLocaleDateString()}</span>
                            </li>}

                    </ul>
                </div>
                <div className="col-7">
                    <h4 className='text-primary text-center'>¡Únete y Colabora! Tu Opinión Importa </h4>
                    <p className="text-center">Si te inspira una idea o te gustaría ser parte del equipo, no dudes en pedirle al autor del proyecto que te invite.</p>
                    <p className="text-center">Dejale un comentario al <a href="#fin">final del documento</a>.</p>
                </div>
            </div>
            <div className=" pe-5 ps-5 pt-3 ">
                <div className="row  bg-light">
                    <div className="col-12 page-title pt-4 text-center ">
                        <h1 className={styles.title}>{documentComplete.title}</h1>
                    </div>
                </div>
                <div className="row bg-light">
                    <div className="col-12 pt-4 ">
                        {/* <ReactQuill  modules={modules} readOnly={true} theme="snow" value={decode(documentComplete.content)} /> */}
                        {/* {parse(documentComplete.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>'))} */}
                        {parse(decode(documentComplete.content))}
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <ListComment idDoc={documentComplete.documentId} />
                </div>
            </div>
            <div className="row align-items-center pb-4" id="fin">
                <div className="col-6 pt-4 text-center">

                    <FormAddComment id={documentComplete.documentId} />
                </div>
            </div>


        </div>

    );
}
