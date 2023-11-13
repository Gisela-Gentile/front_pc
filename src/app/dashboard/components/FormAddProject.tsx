"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

interface FormProject {
    title: string,
    description: string,
    category: string,
}

export default function FormAddProject() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({ title: '', description: '', category: '' });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    async function fetchCategories() {
        const res = await fetch(`${API_URL}/category/view/all`);
        const data = await res.json();
        return data;
    }
    
    async function createProject(project: FormProject): Promise<Response> {
        const res = await fetch(`${API_URL}/project/add`, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: { "Content-Type": "application/json", },
        });

        return res
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        setError(false);
        setMessage('');
        event.preventDefault();
        const project = {
            title: formData.title,
            description: formData.description,
            category: formData.category,

        }
        try {
            const res = await createProject(project);
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (res.status === 201) {

                router.push('/');
                alert('Proyecto creado exitosamente')
            }
            else {
                setError(true);
                const errors: string[] = data.message;
                setMessage(errors.toString());
            }
        } catch (e) {
            setError(true);
            setMessage(message);
            return false;
        }

    }

    const btnBack = () => {
        router.back();
    };

    
    return (
        <div className="container rounded text-center col-xs-12 col-md-6 col-sm-3 p-5 mt-4 bg-white">

        <form onSubmit={handleSubmit} className='border border-2 border-primary p-2'>
          <div className=' d-flex justify-content-end bg-light mb-3'>
            <button
              onClick={btnBack}
              type="button"
              className="btn btn-danger btn-block m-2"
            >X
            </button>
          </div>
  
          <h3 className='text-primary text-center'>Crear Proyecto</h3>
          <div className="form-group text-start mb-3">
                            <label className="form-label mt-4" htmlFor="title">Título<sup aria-hidden="true">*</sup></label>
                            <input
                                type="text"
                                autoComplete='off'
                                className="form-control bg-light"
                                id="title"
                                value={formData.title}
                                placeholder="Título del proyecto"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value, })}
                            />
                        </div>
                         <div className="form-group mb-3 text-start">
                            <label className="form-label" htmlFor="category">Categoría<sup aria-hidden="true">*</sup></label>
                            <select className="form-select bg-light"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value, })}
                                aria-label="Default select example">
                                 <option selected>Seleccione una opción</option> 
                                 {
                                    categories.map((category: { categoryId: string, name: string }) => (
                                        <option className="form-control bg-light" key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                    ))
                                }

                            </select>
                        </div>  

                       
                        <div className="form-group text-start mb-3">
                            <label className="form-label" htmlFor="content">Descripción<sup aria-hidden="true"></sup>*</label>
                            <textarea
                                autoComplete='off'
                                className="form-control bg-light"
                                rows={4}
                                id="content"
                                value={formData.description}
                                placeholder="Escribe una breve descripción"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value, })}
                            />
                        </div>                      
                      <button type="submit" id="btn-addProject" className="btn btn-primary btn-block ">
                            Crear
                        </button>
                        
                    </form>
                    {message && <div className="alert alert-warning">{message}</div>}
                </div>
    )
}
