import { API_URL } from '@/config/constants';
import { ItemLastDocument } from '@/app/interfaces/Document';


{/*async function fetchDocument(idDoc: number,idHis:number): Promise<ItemLastDocument> {
  const res = await fetch(`${API_URL}/document/${idDoc}/history/${idHis}`);
  const data = await res.json();
  return data;
}*/}
  
export default async function ItemListDocument({document}:{document:ItemLastDocument}) {
  {/*const lastDocument = await fetchDocument(document.documentId,document.historyId);*/}
  return (
    <>
      <td>{document.title}</td>
      <td>{new Date(document.creationDateDocument).toLocaleDateString()}</td>
      
    </>
  )
}
