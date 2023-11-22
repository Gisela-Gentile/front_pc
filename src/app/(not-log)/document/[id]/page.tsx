import Breadcrumbs from "@/app/dashboard/components/Breadcrumbs";
import { DocumentComplete } from "@/app/interfaces/Document";
import DocumentView from "@/components/DocumentView";
import { API_URL } from "@/config/constants";

async function fetchDocumentComplete(id: number): Promise<DocumentComplete> {
  const res = await fetch(`${API_URL}/document/${id}/view`);
  const data = await res.json();
  return data;
}



export default async function PageDocument({ params: { id }, }: { params: { id: string } }) {
  const documentComplete = await fetchDocumentComplete(Number(id));
  return (
    <div className="container"> 
      <Breadcrumbs breadcrumbs={[
        { label: 'Inicio', href: '/', },
        { label: `${documentComplete.projectTitle}`, href: `/project/${documentComplete.projectId}`,active: true, },]}/>
      <hr/>   
      <div className="row">
        <div className="offset-2 col-8">             
          <DocumentView documentComplete={documentComplete} />
        </div>
      </div>
    </div>  
  )
}
