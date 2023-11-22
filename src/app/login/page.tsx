"use client"
import { API_URL } from "@/config/constants";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { selectToken } = useAuth();
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({ email: '', password: '', });

    async function fetchUser(email: string, password: string) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.status === 201) {
            selectToken(data.data.access_token);
            return data;
            {/*const response = NextResponse.json({data,});
            response.cookies.set({
                name: "myTokenName",
                value: data.data.access_token,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: "/",
            });
            console.log("Este es response antes de salir");
            
            router.push("/dashboard");
            return response;*/}
        } else {
            setMessage('Credenciales invalidas');
            return NextResponse.json({ message: "Credenciales invalidas", }, { status: 401, });
        }
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await fetchUser(formData.email, formData.password);
            router.push("/dashboard");
        } catch (error) {
            setMessage('')
            return false;
        }
    }
    return (
        <div className="container" style={{['minHeight' as any]:"700px" }}>
            <section className="p-5 m-5">
            <div className="rounded text-center border offset-md-3 col-md-6 col-xs-12 p-5 bg-sesion">
                <div className="row align-items-center">
                    <div className="">
                        <h2 className="text-center">Iniciar sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="email">Correo electrónico:</label>
                                <input
                                    type="email"
                                    autoComplete="false"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    placeholder="Ingrese Email"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value, })}
                                />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    autoComplete="false"
                                    className="form-control"
                                    id="password"
                                    value={formData.password}
                                    placeholder="Ingrese password"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value, })}
                                />
                            </div>
                            <button type="submit" id="btn-iniciar" className="m-3 btn btn-primary btn-block">
                                Iniciar Sesión
                            </button>                            
                        </form>
                        {message && <div className="alert alert-danger">{message}</div>}
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

