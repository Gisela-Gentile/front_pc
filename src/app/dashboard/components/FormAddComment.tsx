"use client"
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
//import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

interface FormComment {

  author: string;
  email: string;
  content: string;

}
export default function FormAddComment( {id}: { id: number } ) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ author: '', email: '', content: '' });

  async function createComment(contact: FormComment): Promise<Response> {
    const res = await fetch(`${API_URL}/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: { "Content-Type": "application/json", },
    });

    return res
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setError(false);
    setMessage('');
    event.preventDefault();
    const comment = {
      
      author: formData.author,
      email: formData.email,
      content: formData.content,
    }
    try {
      const res = await createComment(comment);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        // setTimeout(() => { setMessage('Redirigiendo..')}, 5000);
        // aca podria ir un cartel de redireccion!!
        router.refresh();
        alert('Envio exitoso')
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
        <h1 className='text-white'>Comentarios</h1>
        

        <form onSubmit={handleSubmit} className='border border-2 border-primary p-2'>
          <div className=' d-flex justify-content-end bg-light mb-3'>
            <button
              onClick={btnBack}
              type="button"
              className="btn btn-danger btn-block m-2"
            >X
            </button>
          </div>
  
          <h2 className='text-primary text-center'>Comentarios</h2>
          <h3 className='text-primary'>¡Únete y Colabora! Tu Opinión Importa </h3>
        <p>Si te inspira una idea o te gustaría ser parte del equipo, no dudes en pedirle al autor del proyecto que te invite.</p>
          <div className="form-group text-start mb-2">
              <label className="form-label mt-4" htmlFor="author"><sup aria-hidden="true"></sup></label>
              <input

                type="text"
                autoComplete='off'
                className="form-control bg-light"
                id="author"
                value={formData.author}
                placeholder="Nombre"
                onChange={(e) => setFormData({ ...formData, author: e.target.value, })}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="email"><sup aria-hidden="true"></sup></label>
              <input
                type="email"
                autoComplete='off'
                className="form-control bg-light"
                id="email"
                value={formData.email}
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value, })}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="content"><sup aria-hidden="true"></sup></label>
              <textarea

                autoComplete='off'
                className="form-control bg-light"
                rows={6}
                id="content"
                value={formData.content}
                placeholder="Escribe aquí"
                onChange={(e) => setFormData({ ...formData, content: e.target.value, })}
              />
            </div>
            <button type="submit" id="btn-addComment" className="btn btn-primary btn-block m-2">
              Enviar
            </button>
           
          </form>
          {message && <div className="alert alert-warning">{message}</div>}
        </div>
  )
}
