'use client'
import { useState, useEffect } from 'react';
import { Category } from '@/app/interfaces/Category';
import styles from './ListCategoryCard.module.css';
import { ProjectCard } from '@/components/ProjectCard';
import { API_URL } from '@/config/constants';

async function fetchCategories() {
    const res = await fetch(`${API_URL}/category/view/all`);
    const data = await res.json();
    return data;
}

async function fetchProjectsByCategory(categoryName: string, page: number, pageSize: number) {
    const res = await fetch(`${API_URL}/project/by-category/${categoryName}?page=${page}&pageSize=${pageSize}`);
    const data = await res.json();
    return data;
}

async function fetchData(selectedCategory: string | null, page: number, pageSize: number, setFilteredProjects: React.Dispatch<React.SetStateAction<any[]>>) {
    if (selectedCategory) {
        try {
            const projectsInCategory = await fetchProjectsByCategory(selectedCategory, page, pageSize);
            setFilteredProjects(projectsInCategory);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }
}

function ListCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 3; // Número de proyectos por página

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setCurrentPage(1); // Al cambiar la categoría, volvemos a la página 1
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchDataEffect = async () => {
            await fetchData(selectedCategory, currentPage, pageSize, setFilteredProjects);
        };

        fetchDataEffect();
    }, [selectedCategory, currentPage]);

    useEffect(() => {
        const fetchCategoriesEffect = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        };

        fetchCategoriesEffect();
    }, []);
    //Calcular el número total de proyectos 
    const totalProjects = filteredProjects.length;
    return (
        <section className=''>
            <div className='row'>
                <div className='col-md-11'>
                    <ul className={styles.defaultItemList}>
                        {categories.length > 0 ? (
                            categories.map((category: Category) => (
                                <li key={category.categoryId}>
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryClick(category.name)}
                                        className={`btn btn-outline-secondary btn-sm text-capitalize ${selectedCategory === category.name ? 'active' : ''}`}
                                    >
                                        {category.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li key={0}>No existen Categorias vigentes.</li>
                        )}
                    </ul>
                </div>
            </div>

            {totalProjects > 0 ? (
                <div className='row mt-4'>
                    {filteredProjects.map((project: any) => (
                        <div className='col-md-4' key={project.projectId}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='row mt-4 '>
                    <div className='col-md-6 bg-light m-3 p-2'>No hay proyectos en la categoría seleccionada.</div>
                </div>
            )}


            <div className='row mt-4'>
                <div className='col-md-12'>
                    {/* Paginación para la lista de proyectos */}
                    <nav aria-label='Page navigation'>
                        <div className="pagination">
                            {<ul className='pagination'>
                                {Array.from({ length: Math.ceil(filteredProjects.length / pageSize) }, (_, index) => index + 1).map((page) => (
                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                        
                                        <button className='m-2' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                            &laquo;
                                        </button>
                                        <span> {currentPage}</span>
                                        <button className='m-2' onClick={() => handlePageChange(currentPage + + 1)}>&raquo;</button>
                                    </li>
                                ))}
                            </ul>}
                        </div>
                    </nav>
                </div>
            </div >
        </section >
    );
}

export default ListCategories;