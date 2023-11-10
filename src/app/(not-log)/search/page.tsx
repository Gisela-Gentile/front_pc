"use client"
import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';



export default function SearchPage() {
    /*const searchParams = useSearchParams();*/
    
    const [search, setSearch] = useState<string>("");
    const [resultado, setResultado] = useState<Project[]>([]);
    /*const findText = searchParams.get('q');*/
    /*if (findText!==null){*/
        /*setSearch(findText);*/
        useEffect(()=>{
            async function fetchSearchProjects(q:string) {
                try {
                    const res = await fetch(`${API_URL}/project/search?${q!=='' ? `title=${q}`:''}&sortBy='ASC'&skip=10`);    
                    /*const data = await res.json();
                    console.log(data);
                    return data;*/
                    setResultado(await res.json());
                } catch (e){
                    console.log("Couldn't make API call:/n",e);
                }            
            }
            fetchSearchProjects(search);
        },[search]);
    /*}*/
       
    return (
        <section>
            <h1>Proyectos</h1>
            <input type="text" name="Search" id="search" value={search} placeholder="Buscar" onChange={(e) => setSearch(e.target.value)}/>
        
      
            <div className="container">
            {
                (resultado && resultado.length>0 ) ? (resultado.map((project: Project) => (
                <div className='row' key={project.projectId}>
                    <div className='col-md-12'>{`${project.title} - ${project.author} - ${project.category} - ${project.creationDate}`}</div>
                    <div className='col-md-12'>{project.description}</div>
                    <hr/>
                </div>
                ))) : ''
            }      
            </div>
        </section>
    );
}