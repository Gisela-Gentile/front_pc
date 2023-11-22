"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateUser } from '../interfaces/User';
import { API_URL } from '@/config/constants';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ firstName: '', lastName: '', username: '', email: '', password: '', repassword: '' });

  async function createUser(users: CreateUser):Promise<Response> {
        const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(users),
        headers: { "Content-Type": "application/json", },
      });
    return res
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    setMessage('');
    console.log(formData);
    event.preventDefault();
    if ((formData.password !== formData.repassword)) {
      setError(true);
      setMessage('Error password invalido.')
      return false
    }
    else {
      const users = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
      try {
      const res = await createUser(users);
      console.log(res);
      const data = await res.json();
      console.log(data);
        if (res.status === 201) {
          {/*setTimeout(() => { setMessage('Redirigiendo..')}, 5000);
          aca podria ir un cartel de redireccion!!*/}
          router.push('/login');
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
  }
  return (
    <div className="container" style={{['minHeight' as any]:"700px" }}>
      <section className="p-5 m-5">
      <div className="rounded border text-center col-xs-12 offset-md-3 col-md-6  p-5 bg-sesion">
        <div className="row align-items-center">
          <h2 className="text-center">Registrarse</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="firstName">Nombre:<sup aria-hidden="true">*</sup></label>
              <input
                type="text"
                autoComplete='off'
                className="form-control"
                id="firstName"
                value={formData.firstName}
                placeholder="Ingrese Nombre"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value, })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="lastName">Apellido:<sup aria-hidden="true">*</sup></label>
              <input
                type="text"
                autoComplete='off'
                className="form-control"
                id="lastName"
                value={formData.lastName}
                placeholder="Ingrese Apellido"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value, })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="userame">Nombre de Perfil:<sup aria-hidden="true">*</sup></label>
              <input
                type="text"
                autoComplete='off'
                className="form-control"
                id="username"
                value={formData.username}
                placeholder="Ingrese nombre para el Perfil"
                onChange={(e) => setFormData({ ...formData, username: e.target.value, })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Correo electrónico:<sup aria-hidden="true">*</sup></label>
              <input
                type="email"
                autoComplete='off'
                className="form-control"
                id="email"
                value={formData.email}
                placeholder="Ingrese Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value, })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Contraseña:<sup aria-hidden="true">*</sup></label>
              <input
                type="password"
                autoComplete='off'
                className="form-control"
                id="password"
                value={formData.password}
                placeholder="Ingrese password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value, })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="repassword">Reingrese la Contraseña:<sup aria-hidden="true">*</sup></label>
              <input
                type="password"
                autoComplete='off'
                className="form-control"
                id="repassword"
                value={formData.repassword}
                placeholder="Reingrese el password"
                onChange={(e) => setFormData({ ...formData, repassword: e.target.value, })}
              />
            </div>
            <button type="submit" id="btn-registar" className="btn btn-primary btn-block m-3">
              Enviar
            </button>
          </form>
          {message && <div className="alert alert-danger">{message}</div>}
        </div>
      </div>
      </section>
    </div>
  )
}
