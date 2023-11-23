import { API_URL } from "@/config/constants";
import { User } from "@/app/interfaces/User";
import Image from "next/image";

async function fetchUsuario(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/user/${id}/view`);
  const data = await res.json();
  return data;
}

export default async function UsuarioComplete({ id }: { id: number }) {
  const user = await fetchUsuario(id);

  return (
    <>
    
      <div className="d-flex justify-content-between align-items-start"  >
        <Image
          src="/assets/avatar-verde.png"
          alt="foto perfil"
          width={50}
          height={50}
          sizes="(max-width: 768px) 100vw,(max-width:1200 px) 50vw,33vw"
          style={{ height: '20%', width: '20%', }} priority />
        <div>
          <h2 className="text-success">{user.username}</h2>
          <h4>{user.lastName} {user.firstName}</h4>
          <h4>{user.email}</h4>
          <h4> Fecha de registro: {user.dateRegistration && new Date(user.dateRegistration).toLocaleDateString()}</h4>
        </div>
      </div>

    </>
  )
}
