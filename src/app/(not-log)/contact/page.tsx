import Image from "next/image"
import FormContact from "@/components/FormContact"

export default function ContactPage() {
  return (
    <div className=" p-2">
      <h1 className=" text-primary text-center mb-3">Contacto</h1>
      <h4 className='text-success mb-3'>¡Nos encantaría escucharte! 
      Utiliza el formulario a continuación para ponerte en contacto con nosotros:</h4>
     <div className=" d-flex justify-content-between p-2">
      <Image
        src="/assets/call-center.png"
        alt="presentation"
        width={200}
        height={100}

        sizes="(max-width: 768px) 100vw,(max-width:1200 px) 50vw,33vw"
        style={{ height: '50%', width: '50%', }} priority />

      <FormContact />
    </div>
    </div >
  )
}
