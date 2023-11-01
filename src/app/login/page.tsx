"use client"
import { API_URL } from "@/config/constants";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { selectToken } = useAuth();
    const [message,setMessage] = useState('')   
    const [formData, setFormData] = useState({email: '',password: '',});
    
    async function fetchUser(email:string,password:string) {      
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
        const data = await res.json();
        console.log(data);
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
            setMessage('Invalid credentials');
            return NextResponse.json({ message: "Invalid credentials",},{status: 401,});
        }
    }
       
      
    const handleSubmit = async (event:React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const res = await fetchUser(formData.email,formData.password);
            router.push("/dashboard");
        } catch (error){
            setMessage('')
            return false;
        }
    }
      
    function handlePasswordReset(){}  
    
    return (
        <>
            <h1>Login</h1>
            <div className="container rounded text-center col-xs-12 col-md-4 col-sm-3 p-5 mt-4 bg-sesion">
                <div className="row align-items-center">
                    <div className="">
                        <h2 className="text-center">Iniciar sesión</h2>                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico:</label>
                                <input
                                    type="email"
                                    autoComplete="false"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    placeholder="Ingrese Email"
                                    onChange={(e) => setFormData({...formData, email: e.target.value,})}                              
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="password"
                                    autoComplete="false"
                                    className="form-control"
                                    id="password"
                                    value={formData.password}
                                    placeholder="Ingrese password"
                                    onChange={(e) => setFormData({...formData, password: e.target.value,})}                              
                                />
                            </div>
                            {/*<div className="checkbox">
                                <label>
                                    <input type="checkbox" /> Recordarme
                                </label>
                            </div>*/}
                            <button type="submit" id="btn-iniciar" className="btn btn-primary btn-block">
                                Iniciar sesión
                            </button>
                            <button
                                type="button"
                                id="btn-pass"
                                className="btn btn-secondary btn-block m-2"
                                onClick={() => {handlePasswordReset();}}
                            >
                                Olvidé mi contraseña
                            </button>
                        </form>
                        {message && <div className="alert alert-danger">{message}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

