"use client"
import { Project } from '@/app/interfaces/Project';
import { API_URL } from '@/config/constants';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineSearch } from "react-icons/hi";


export default function SearchPage() {

    const [search, setSearch] = useState<string>("");
    const [resultado, setResultado] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchSearchProjects(q: string) {
            try {
                const res = await fetch(`${API_URL}/project/search?${q !== '' ? `title=${q}` : ''}&sortBy='ASC'&skip=10`);
                setResultado(await res.json());
            } catch (e) {
                console.log("Couldn't make API call:/n", e);
            }
        }
        fetchSearchProjects(search);
    }, [search]);


    return (
        <section>
            <div className='row justify-content-center m-3 mt-5'>
                <div className='col-12 align-self-center'>
                <h2 className='text-center'>¡Buscá el proyecto por su nombre!</h2>
                </div>
            </div>
            <div className="row justify-content-center m-5">
                
                <div className="col-6 align-self-center">
                    <input type="text" name="Search" id="search" value={search} className='col-10 p-1' width={10} placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} />
                    <span className="col-1 p-2 bg-black text-white border rounded-end">
                        <HiOutlineSearch /></span>
                </div>
            </div>
            <div className="container">
                {
                    (resultado && resultado.length > 0) ?
                        (resultado.map((project: Project) => (
                            <Link className='text-decoration-none' href='/project/[projectId]' as={`/project/${project.projectId}`}>

                                <div className='row ' key={project.projectId}>
                                    <div className='col-md-12'>{`${project.title} - ${project.author.username} - ${project.category?.name} - ${new Date(project.creationDate).toLocaleDateString()}`}</div>
                                    <div className='col-md-12'>{project.description}</div>
                                    <hr />

                                </div>
                            </Link>
                        ))) : ''
                }
            </div>
        </section>
    );
}