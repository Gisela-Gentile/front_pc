"use client"
import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';



export default function SearchPage() {
      
    const [search, setSearch] = useState<string>("");
    const [resultado, setResultado] = useState<Project[]>([]);
    
        useEffect(()=>{
            async function fetchSearchProjects(q:string) {
                try {
                    const res = await fetch(`${API_URL}/project/search?${q!=='' ? `title=${q}`:''}&sortBy='ASC'&skip=10`);    
                    setResultado(await res.json());
                } catch (e){
                    console.log("Couldn't make API call:/n",e);
                }            
            }
            fetchSearchProjects(search);
        },[search]);
   
       
    return (
        <section>
            <div className="row justify-content-center m-5">
                <div className="col-6 align-self-center">
                    <input type="text" name="Search" id="search" value={search} placeholder="Buscar" onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="container">
            {
                (resultado && resultado.length>0 ) ? (resultado.map((project: Project) => (
                <div className='row' key={project.projectId}>
                    <div className='col-md-12'>{`${project.title} - ${project.author.username} - ${project.category?.name} - ${new Date(project.creationDate).toLocaleDateString()}`}</div>
                    <div className='col-md-12'>{project.description}</div>
                    <hr/>
                </div>
                ))) : ''
            }      
            </div>
        </section>
    );
}