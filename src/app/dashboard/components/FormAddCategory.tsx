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
  const [formData, setFormData] = useState({ name: '' });

  async function createCategory(category: FormCategory): Promise<Response> {
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
       
        <h3 className='text-primary text-center'>Agregar Categoría</h3>
        <div className="form-group text-start mb-3" >
          <label className="form-label mt-4" htmlFor="category"> Nueva Categoría<sup aria-hidden="true"></sup></label>
          <input

            type="text"
            autoComplete='off'
            className="form-control bg-light"
            id="category"
            value={formData.name}
            placeholder="Ingrese nombre de la categoria"
            onChange={(e) => setFormData({ ...formData, name: e.target.value, })}
          />
        </div>


        <button type="submit" id="btn-addCategory" className="btn btn-primary btn-block m-2">
          Agregar
        </button>

      </form>
      {message && <div className="alert alert-warning">{message}</div>}
    </div>


  )
}
