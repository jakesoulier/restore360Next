'use client'
import { Button, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";


interface ContactForm {
    title: string;
    description: string;
}

const NewContactPage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<ContactForm>();


  return (
    <form className="max-w-xl space-y-3" 
    onSubmit={handleSubmit(async (data) => {
        await axios.post('/pages/api/contacts', data);
        router.push('/contacts');
    })}>
        <TextField.Root>
            <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <Controller
            name='description'
            control={control}
            render={({ field }) => <SimpleMDE placeholder="reply to comment" {...field} />}
        />
        
        <Button>Submit New Contact</Button>
    </form>
  )
}

export default NewContactPage