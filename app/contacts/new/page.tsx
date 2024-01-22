'use client'
import { Button, TextField, Select, Text } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { query, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import {navigate} from '../../actions';
import { zodResolver } from "@hookform/resolvers/zod";
import { createContactSchema } from "@/app/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { addDataToFirestore } from "../../components/addDataToFirestore";

type ContactForm = z.infer<typeof createContactSchema>;

export default function NewContactPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ContactForm>({
        resolver: zodResolver(createContactSchema)
    });
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const onSubmit = async (data: Record<string, any>) => {
        
        const { name, email, description } = data;
        setIsLoading(true); // Set loading state to true
        
        try {
            const added = await addDataToFirestore(name, email, description);
            navigate();

            // router.push('/new-page');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root>
                    <TextField.Input placeholder="Name" {...register('name')} />
                </TextField.Root>
                
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                
                <TextField.Root>
                    <TextField.Input placeholder="Email" {...register('email')} />
                </TextField.Root>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="reply to comment" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Select.Root defaultValue="optionOne" >
                    <Select.Trigger />
                    <Select.Content position="popper">
                        <Select.Item value="optionOne">Option 1</Select.Item>
                        <Select.Item value="optionTwo">Option 2</Select.Item>
                    </Select.Content>
                </Select.Root>

                <br /> {/* Add a line break */}
                
                <Button disabled={isLoading}>
                    {isLoading ? <Spinner /> : 'Submit New Contact'}
                </Button>
                {/* <Spinner/> */}
            </form>
        </div>
    );
}