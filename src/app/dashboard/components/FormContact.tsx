"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { CreateUser } from '../interfaces/User
import { API_URL } from '@/config/constants';
interface FormContact {

    author: string;
    email: string;
    content: string

}
export default function FormContact() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({ author: '', email: '', content: '' });

    async function createContact(contact: FormContact): Promise<Response> {
        const res = await fetch(`${API_URL}/comment/${1}`, {
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
        const contact = {
            author: formData.author,
            email: formData.email,
            content: formData.content,
        }
        try {
            const res = await createContact(contact);
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (res.status === 201) {

                router.push('/');
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
        <div className='container'>
            <div className="container rounded text-center col-xs-12 col-md-6 col-sm-3 p-5 mt-4 bg-success">
                <h1 className='text-white'> Contacto</h1>
                <p className='text-white'>¡Nos encantaría escucharte! Utiliza el formulario a continuación para ponerte en contacto con nosotros:</p>
                <div className="form-group">


                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label mt-4" htmlFor="author"><sup aria-hidden="true"></sup></label>
                            <input

                                type="text"
                                autoComplete='off'
                                className="form-control bg-success text-white"
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
                                className="form-control bg-success text-white"
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
                                className="form-control bg-success text-white"
                                rows={4}
                                id="content"
                                value={formData.content}
                                placeholder="Escribe aquí"
                                onChange={(e) => setFormData({ ...formData, content: e.target.value, })}
                            />
                        </div>
                        <button type="submit" id="btn-contact" className="btn btn-primary btn-block m-2">
                            Enviar
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
