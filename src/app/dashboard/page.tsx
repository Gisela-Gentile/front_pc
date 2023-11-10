"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Fragment, useEffect } from "react";
import Nav from "./components/Nav";

export default function DashboardPage() {
  const { token, user } = useAuth();
  console.log(`token: ${token}`);
  console.log(`user: ${user}`);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [token,])

  return (
    <>
    <div className="row">
        <div id="sidebar" className="col-md-3" >
          <Nav/>
        </div>
        <div id="content" className="col-md-9" style={{ ['borderLeft' as any]: "1px solid #ccc" }}>
        { user && (<div>Bievenido  {user.firstName} {', '+user.lastName}</div>)}
        </div>
      </div> 
    </>
  );
}