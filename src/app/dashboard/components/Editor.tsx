'use client'
import { useAuth } from '../app/context/AuthContext';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/config/constants';
import { text } from 'stream/consumers';

interface FormDocument {
  title: string;
  messaggesLog?: string;
  content: string;
}

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function FormAddDocumnet({ id }: { id: number }) {
  const { token,user} = useAuth();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [messaggesLog, setMessaggesLog] = useState('');
console.log(token)
  useEffect(() => {
    // Se ejecuta después de que el componente se monta
    // Coloca la lógica de carga del editor aquí
    const Quill = require('react-quill'); // Requiere el módulo aquí
    if (Quill.default) {
      // Verifica que el módulo se haya cargado correctamente
      setContent('<p>Escriba aquí...</p>'); // Establece un contenido predeterminado
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ font: [] }],
        ['link', 'image'],
      ],
    },
  };

  const formats = [
     'header','bold', 'italic', 'underline', 'strike',
   'size', 'list', 'indent',
    'color', 'background',
    'align', 'font','link',
  ];

  async function createDocument(document: FormDocument): Promise<Response> {
    const res = await fetch(`${API_URL}/project/${1}/add/document`, {
      method: 'POST',
      body: JSON.stringify(document),
      headers: { 'Content-Type': 'application/json', 
      'Authorization':`Bearer ${token}`,},
    });

    return res;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    setMessage('');
    event.preventDefault();
    if (!user) {
      
      router.push('/');
      return;
    }

    const document = {
      title: title,
      messaggesLog: messaggesLog,
      content: content,
    };
    try {
      const res = await createDocument(document);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.status === 201) {
        router.push('/');
        alert('El documento se creó exitosamente');
      } else {
        setError(true);
        const errors: string[] = data.message;
        setMessage(errors.toString());
      }
    } catch (e) {
      setError(true);
      setMessage(message);
      return false;
    }
  };

  const btnBack = () => {
    router.back();
  };

  return (
    
    
        <div className="container border border-2 border-primary rounded text-center col-xs-12 col-md-12 col-sm-3 p-5 mt-4 bg-white">
          <h1 className='text-prymary'>Creá y editá tus documentos!!</h1>
          <div className="form-group">
            <form action={''} onSubmit={handleSubmit}>
              <div className="form-group text-start">
                <label className="form-label mt-4" htmlFor="title">Título del documento<sup aria-hidden="true"></sup></label>
                <input
                  type="text"
                  autoComplete='off'
                  className="form-control bg-light "
                  id="title"
                  value={title}
                  placeholder="Ingrese el título del documento"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group text-start mb-3">
                <label className="form-label mt-4 " htmlFor="message">Comentario<sup aria-hidden="true"></sup></label>
                <input
                  type="text"
                  autoComplete='off'
                  className="form-control bg-light "
                  id="message"
                  value={messaggesLog}
                  placeholder="comentario"
                  onChange={(e) => setMessaggesLog(e.target.value)}
                />
              </div>

              <div>
                <QuillNoSSRWrapper
                  modules={modules}
                  value={content}
                  placeholder="Escriba aquí..."
                  onChange={(content, delta, source, editor) => {
                    setContent(content);
                  }}
                  formats={formats}
                  theme="snow"
                />
              </div>
              <button type="submit" id="btn-addDocument" className="btn btn-primary btn-block text-center m-3">
                Guardar
              </button>
              <button
                onClick={btnBack}
                type="button"
                className="btn btn-danger btn-block  text-center m-3"
              >
                Cancelar
              </button>
            </form>
            {message && <div className="alert alert-warning">{message}</div>}
          </div>
        </div>
      
    
  );
}
