import { API_URL } from "@/config/constants";
import { User } from "@/app/interfaces/User";


async function fetchUsuario(id:number):Promise<User> {
    const res = await fetch(`${API_URL}/user/${id}/view`);
    const data = await res.json();
    return data;
  }

export default async function UsuarioComplete({id}:{id: number}) {
    const user = await fetchUsuario(id);

  return (
    <>
      <h1>{user.username}</h1>
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <h3>{user.email}</h3>
      <h3>{ user.dateRegistration && new Date(user.dateRegistration).toLocaleDateString()}</h3>      
    </>
  )
}
