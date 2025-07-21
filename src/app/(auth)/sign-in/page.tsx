"use client";
import formData from "../../../data/formSchema.json"; 
import Form from '../../../components/Form';


export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Form formData= {formData} />
    </div>
  );
}