import { Navegacion } from "./Navegacion";
import styles from '@/app/page.module.css';
export default function HeaderPrincipal() {
  return (
    <header className={styles.fondo}>
      <div className='container'>
        <Navegacion />
      </div>
    </header>
  )
}
