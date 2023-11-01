{/*import styles from '@/components/ListCategories.module.css'*/}
import { Collaborator, ListCollaborators } from '@/app/interfaces/Collaborator';
import ItemListCollaborator from './ItemListCollaborator';


export default function ListCollaboratorsProject({listCollaborators}:{listCollaborators:Collaborator[]}) {
     
  return (
    <section className='py-4'>      
      <div className='row'>
      <ul className="">
        {
          listCollaborators.map((collaborator:Collaborator) => (
            <li key={collaborator.collaboratorId} className='listGroup'>
               <ItemListCollaborator collaborator={collaborator} /> 
            </li>
          ))
        }
      </ul> 
      </div>
    </section>
  )
}