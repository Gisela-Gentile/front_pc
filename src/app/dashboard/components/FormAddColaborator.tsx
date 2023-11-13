"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

interface FormColaborators {
  email: string;

}
export default function FormAddColaborators({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ email: '' });

  async function createCategory(colaborator: FormColaborators): Promise<Response> {
    const res = await fetch(`${API_URL}/project/${id}/add/collaborator`, {
      method: 'POST',
      body: JSON.stringify(colaborator),
      headers: { "Content-Type": "application/json", },
    });

    return res
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setError(false);
    setMessage('');
    event.preventDefault();
    const collaborator = {
      email: formData.email,

    }
    try {
      const res = await createCategory(collaborator);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        // setTimeout(() => { setMessage('Redirigiendo..')}, 5000);
        // aca podria ir un cartel de redireccion!!
        router.push('/');
        alert('La invitación se mando exitosamente')
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

        <h3 className='text-primary text-center'>Agregar Colaboradores</h3>
        <div className="form-group text-start mb-3">
          <label className="form-label mt-4" htmlFor="email">Colaborador<sup aria-hidden="true"></sup></label>
          <input
            type="email"
            autoComplete='off'
            className="form-control bg-lihgt"
            id="email"
            value={formData.email}
            placeholder="Ingrese el Email del colaborador"
            onChange={(e) => setFormData({ ...formData, email: e.target.value, })}
          />
        </div>

        <button type="submit" id="btn-AddCollaborator" className="btn btn-primary btn-block m-2">
          Agregar
        </button>

      </form>
      {message && <div className="alert alert-warning">{message}</div>}
    </div>


  )
}
