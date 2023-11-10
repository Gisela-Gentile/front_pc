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
    <>     
      <DocumentView documentComplete={documentComplete} />    
    </>
  )
}
