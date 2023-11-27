import { Collaborator,} from '@/app/interfaces/Collaborator';
import ItemListCollaborator from './ItemListCollaborator';

export default function ListCollaboratorsProject({listCollaborators}:{listCollaborators:Collaborator[]}) {
     
  return (
    <section className='pb-4'>      
      <div className='row'>
      <ul className="list-group">
        {
          listCollaborators.map((collaborator:Collaborator) => (
            <li key={collaborator.collaboratorId} className="list-group-item d-flex justify-content-between align-items-center">
               <ItemListCollaborator collaborator={collaborator} /> 
            </li>
          ))
        }
      </ul> 
      </div>
    </section>
  )
}