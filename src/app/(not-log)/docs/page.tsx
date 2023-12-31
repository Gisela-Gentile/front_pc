import Image from "next/image"
import style from '@/app/(not-log)/docs/Docs.module.css'
import { FcCheckmark } from "react-icons/fc";

export default function PageDocument() {
  return (
    <>
      <h1 className="title mt-5">Bienvenido a la Plataforma de Proyectos Colaborativos</h1>
      <p className="pt-2">¡Gracias por unirte a nuestra plataforma de proyectos colaborativos! Nuestra herramienta está diseñada para facilitar la colaboración y la gestión de proyectos en equipo. A continuación, te explicaremos las cuatro sesiones principales y cómo sacar el máximo provecho de ellas.</p>
      <div className="d-flex justify-content-center">
        <Image
          src="/assets/docs1.jpg"
          alt="presentation"
          width={200}
          height={100}
          sizes="(max-width: 768px) 100vw,(max-width:1200 px) 50vw,33vw"
          style={{ height: '50%', width: '50%', }} priority />
      </div>
      <h2 className="my-5">1. Creación del Proyecto</h2>
      <p className="pt-2">Para comenzar, necesitas registrarte en la plataforma si aún no lo has hecho. Una vez registrado, puedes crear un nuevo proyecto siguiendo estos pasos:</p>
      <ul className={style.lista}>
        <li><FcCheckmark />Inicia sesión en tu cuenta.</li>
        <li><FcCheckmark />Ve a la sección "Crear Proyecto".</li>
        <li><FcCheckmark />Rellena los detalles del proyecto, como el nombre, la descripción y la categoría(si no esta la puedes agregar).</li>
        <li><FcCheckmark />Confirma la creación del proyecto.</li>
      </ul>
      <p>Como autor del proyecto, tienes el control total sobre la gestión del proyecto y puedes invitar a otros colaboradores.</p>
      <h2 className="my-5">2. Gestión de Documentos</h2>
      <p>Dentro de tu proyecto, encontrarás la sección de "Gestión de Documentos", que te permite organizar y editar tus archivos. Sigue estos pasos para trabajar con documentos:</p>
      <ul className={style.lista}>
        <li><FcCheckmark />Ve a la sección "Gestión de Documentos" dentro del proyecto.</li>
        <li><FcCheckmark />Agrega documentos existentes o crea nuevos.</li>
        <li><FcCheckmark />Edita los documentos según sea necesario.</li>
        <li><FcCheckmark />Asigna colaboradores para que puedan acceder y editar los documentos relevantes</li>
      </ul>
      <h2 className="my-5"> 3. Colaboración</h2>
      <p>La colaboración es fundamental en nuestro sistema. Puedes invitar a otros usuarios a tu proyecto para que colaboren contigo. Sigue estos pasos para invitar colaboradores:
      </p>
      <ul className={style.lista}>
        <li><FcCheckmark />En la página del proyecto, ve a la sección "Colaboradores".</li>
        <li><FcCheckmark />Invita a usuarios por su nombre de usuario o dirección de correo electrónico.</li>
      </ul>
      <p>Los colaboradores pueden editar y crear documentos en el proyecto, lo que fomenta la colaboración efectiva.</p>
      <h2 className="my-5">4. Comentarios</h2>
      <p>Fomentamos la comunicación abierta y efectiva entre los usuarios. Cualquier usuario que visite un documento puede agregar comentarios. Sigue estos pasos para comentar en un documento:</p>
      <ul className={style.lista}>
        <li><FcCheckmark />Abre el documento en el que deseas comentar.</li>
        <li><FcCheckmark />Escribe tus comentarios en la sección de comentarios.</li>
        <li><FcCheckmark />Discute ideas, proporciona retroalimentación y colabora con otros usuarios en el documento. </li>
      </ul>
      <p>Esta función es crucial para el intercambio de ideas y la mejora continua de tus proyectos.</p>
      <p>¡Esperamos que esta guía te haya ayudado a familiarizarte con nuestra plataforma de proyectos colaborativos! Si tienes alguna pregunta adicional o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte. ¡Buena suerte en tus proyectos colaborativos!</p>
    </>
  );
}