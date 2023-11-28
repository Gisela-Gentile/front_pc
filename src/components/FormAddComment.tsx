"use client";
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/constants";
import { useRouter } from "next/navigation";
import { useState, } from "react";
import { ToastContainer, toast } from "react-toastify";

interface FormComment {

  author: string;
  email: string;
  content: string;

}
export default function FormAddComment({ id }: { id: number }) {

  const router = useRouter();

  const [formData, setFormData] = useState({ author: '', email: '', content: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      author: formData.author,
      email: formData.email,
      content: formData.content,
    }
    try {
      const res = await fetch(`${API_URL}/comment/${id}`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",

        },
      });
      const data = await res.json();
      switch (res.status) {
        case 201:
          setFormData({ author: '', email: '', content: '' });
          toast.success('El comentario se envió correctamente', { position: 'top-right', autoClose: 1500, pauseOnHover: false, });
          setTimeout(() => {
            router.refresh();
          }, 1600);
          setIsSubmitted(true);
          break;

        default:
          toast.error(`Algo salio mal`, { position: 'bottom-right', autoClose: 3000, });
          break;
      }
    } catch (error) {
      toast.error('Error al enviar el comentario', {
        position: 'bottom-right', autoClose: 3000,
      });
      setIsSubmitted(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className='border border-2 border-primary p-2'>

        <div className="form-group text-start mb-1">
          <label className="form-label " htmlFor="author"><sup aria-hidden="true"></sup></label>
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

        <div className="form-group mb-1">
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

        <div className="form-group mb-1">
          <label className="form-label" htmlFor="content"><sup aria-hidden="true"></sup></label>
          <textarea

            autoComplete='off'
            className="form-control bg-light"
            rows={3}
            id="content"
            value={formData.content}
            placeholder="Escribe aquí"
            onChange={(e) => setFormData({ ...formData, content: e.target.value, })}
          />
        </div>
        <button type="submit" id="btn-addComment" className="btn btn-primary btn-block m-2">
          Enviar
        </button>

        <button
          onClick={() => { setFormData({ author: '', email: '', content: '' }); }}
          type="button"
          className="btn btn-danger btn-block m-2"
        >Limpiar
        </button>
      </form>

      <ToastContainer />
    </section >
  );
}