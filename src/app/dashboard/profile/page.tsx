import Breadcrumbs from "../components/Breadcrumbs";

export default function ProfilePage() {
  return (
    <section className="">
      <Breadcrumbs breadcrumbs={[
        { label: 'Inicio', href: '/dashboard', },
        { label: 'Perfil', href: '/Perfil',active: true, },]}/>
      <hr/>
        <h1>Perfil de Usuario</h1>
    </section>
  )
}
