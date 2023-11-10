"use client"
import { API_URL } from '@/config/constants';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import parse from 'html-react-parser';

interface FormDocument {
  title: string;
  messaggesLog?: string;
  content: string;
}

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})


const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]
export default function FormAddDocumnet({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ title: '', messaggesLog: '', content: '' });

  async function createDocument(document: FormDocument): Promise<Response> {
    const res = await fetch(`${API_URL}/project/${id}/add/document`, {
      method: 'POST',
      body: JSON.stringify(document),
      headers: { "Content-Type": "application/json", },
    });

    return res
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    setError(false);
    setMessage('');
    event.preventDefault();
    const document = {
      title: formData.title,
      messaggesLog: formData.messaggesLog,
      content: formData.content

    }
    try {
      const res = await createDocument(document);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {

        router.push('/');
        alert('El documento se creo exitosamente')
      }
      else {
        setError(true);
        const errors: string[] = data.message;
        setMessage(errors.toString());
      }
    } catch (e) {
      setError(true);
      setMessage(message);
      //return false
    }

  }
  console.log ('soy data')
console.log (formData)
  const btnBack = () => {
    router.back();
  };
  const handleTextChange = (value: string, _delta: any, _source: any, _editor: any) => {
    setFormData({ ...formData, content: value });
  };

  return (
    <div>
      <div className='container m-2'>
        <div className="container rounded text-center col-xs-12 col-md-12 col-sm-3 p-5 mt-4 bg-success">
          <h1 className='text-white'>Nuevo Documento</h1>
          <div className="form-group">

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label mt-4" htmlFor="title"><sup aria-hidden="true"></sup></label>
                <input
                  type="text"
                  autoComplete='off'
                  className="form-control bg-success text-white"
                  id="title"
                  value={formData.title}
                  placeholder="Título del documento"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, })}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label mt-4" htmlFor="message"><sup aria-hidden="true"></sup></label>
                <input
                  type="text"
                  autoComplete='off'
                  className="form-control bg-success text-white"
                  id="message"
                  value={formData.messaggesLog}
                  placeholder="comentario"
                  onChange={(e) => setFormData({ ...formData, messaggesLog: e.target.value, })}

                />
              </div>

              <div className="form-group my-3">
                <label className="form-label" htmlFor="content"><sup aria-hidden="true"></sup></label>
                <textarea

                  autoComplete='off'
                  className="form-control bg-success text-white"
                  rows={6}
                  id="content"
                  value={formData.content}
                  placeholder="Escribe aquí"
                  onChange={(e) => setFormData({ ...formData, content: e.target.value, })}
                />
              </div>
              <button type="submit" id="btn-addDocument" className="btn btn-primary btn-block m-2">
                Guardar
              </button>
              <button
                onClick={btnBack}
                type="button"
                className="btn btn-primary btn-block m-2"
              >
                Cancelar
              </button>

            </form>
            {message && <div className="alert alert-warning">{message}</div>}
          </div>
        </div>
      </div>

    </div>
  )
}

