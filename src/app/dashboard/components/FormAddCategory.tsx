"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

interface FormCategory {
      name: string;
    
}
export default function FormAddCategory() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ name: ''});

  async function createCategory(category:FormCategory ):Promise<Response> {
        const res = await fetch(`${API_URL}/category/add`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: { "Content-Type": "application/json", },
      });
      
    return res
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setError(false);
    setMessage('');
    event.preventDefault();
      const category = {
        name: formData.name,
    
      }
      try {
      const res = await createCategory(category);
      console.log(res);
      const data = await res.json();
      console.log(data);
        if (res.status === 201) {
         // setTimeout(() => { setMessage('Redirigiendo..')}, 5000);
         // aca podria ir un cartel de redireccion!!
          router.push('/');
          alert('La categoría se agrego exitosamente')
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
    <div className='container m-2'>
        <div className="container rounded text-center col-xs-12 col-md-6 col-sm-3 p-5 mt-4 bg-success">
            <h1 className='text-white'>Agregar Categoría</h1>
            <div className="form-group">
      
      
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label mt-4" htmlFor="category"><sup aria-hidden="true"></sup></label>
              <input
              
                type="text"
                autoComplete='off'
                className="form-control bg-success text-white"
                id="category"
                value={formData.name}
                placeholder="Nombre de la categoria"
                onChange={(e) => setFormData({ ...formData, name: e.target.value, })}
              />
            </div>
    
           
            <button type="submit" id="btn-addCategory" className="btn btn-primary btn-block m-2">
              Agregar
            </button>
            <button
                        onClick={btnBack}
                        type="button"
                        className="btn btn-primary btn-block m-2"
                    >
                        Cancelar
                    </button>
            
          </form>
          {message && <div className="alert alert-warning">{message}</div>}
        </div>
      </div>
      </div>
  )
}
