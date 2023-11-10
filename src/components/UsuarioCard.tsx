import { API_URL } from "@/config/constants";
import { User } from "@/app/interfaces/User";
import Link from "next/link";

async function fetchUsuario(id:number):Promise<User> {
    const res = await fetch(`${API_URL}/user/${id}/view`);
    const data = await res.json();
    return data;
  }

export default async function UsuarioCard({id}:{id: number}) {
    const user = await fetchUsuario(id)

  return (
    <>
      <Link href={`/perfil/${user.userId}`}>{user.username}</Link>
    </>
  )
}
