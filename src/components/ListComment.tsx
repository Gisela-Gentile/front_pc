import { API_URL } from "@/config/constants";
import { useEffect, useState } from "react";

interface CommentProps{
    commentId:number,
    author:string,
    email:string,
    content:string,
    creationDate: string

 }

export default function ListComment({idDoc}: {idDoc:number}) {
    const [comments, setComment]= useState<CommentProps[]>();
    useEffect(() => {
      const fetchProjects = async () => {
          try {
            const res = await fetch(`${API_URL}/document/${idDoc}/comment`, { next: { revalidate: 30 },});
            const data = await res.json();
            setComment(data);
          } catch (error) {
            console.error('Error recuperando proyectos', error);
          }
      };
      fetchProjects();
    }, [{idDoc}]);    
    
    return (
      <section className='p-4'>
        <h4 className="py-4"> Comentarios</h4>
        <div className='row'>
          { comments && comments.length > 0 ? (
            comments.map((comment:CommentProps) => (
              <div className='col-md-12 border border-2' key={comment.commentId}>
                <div className="border-bottom">
                { comment.author && <div className={''}><strong>Autor:</strong><b>{' '+ comment.author}</b></div> }
                {comment.email && (<h6 className={''}>{comment.email}</h6>) }
                </div>
                { comment.content && <div className={''}>{comment.content}</div> }
                <div className="border-top">
                {comment.creationDate && <div className=''><strong>Creado:</strong> {' '+ new Date( comment.creationDate).toLocaleDateString()}</div> }
                </div>               
                
              </div>)
            )
          ):(<div className='col-md-12'>Actualmente no tiene comentarios.</div>)
          }
        </div>
      </section>
    )

        }