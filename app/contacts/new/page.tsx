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
console.log(createContactSchema)

export default function NewContactPage() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ContactForm>({
        resolver: zodResolver(createContactSchema)
    });
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const onSubmit = async (data: Record<string, any>) => {
        
        const { name, email, description } = data;
        setIsLoading(true); // Set loading state to true
        // alert(name)
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

                <Text as="div">
                    Has multiple structures
                </Text>
                <Select.Root defaultValue="optionOne" >
                    <Select.Trigger />
                    <Select.Content position="popper">
                        <Select.Item value="optionOne">One structure</Select.Item>
                        <Select.Item value="optionTwo">Multiple structures</Select.Item>
                    </Select.Content>
                </Select.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Address" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Date of Loss" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Date Claim Created" />
                </TextField.Root>

                <Text as="div" size="2" mb="1" weight="bold">
                    Policyholder Details
                </Text>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Name" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Email" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policyholder Phone Number" />
                </TextField.Root>

                <Text as="div" size="2" mb="1" weight="bold">
                    Pictures
                </Text>
                <TextField.Root>
                    <TextField.Input placeholder="add pic and displaynpm " />
                </TextField.Root>
                <Text as="div" size="2" mb="1" weight="bold">
                    More Info
                </Text>

                <TextField.Root>
                    <TextField.Input placeholder="Insurance Company" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Agent/Broker" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Project Manager" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Adjuster" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Policy Number" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Type of loss - will dropdown" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="CAT Code" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Emergency Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Repair Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Contents Estimate" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Default Depreciation" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Max Depreciation" />
                </TextField.Root>

                <TextField.Root>
                    <TextField.Input placeholder="Sales Tax" />
                </TextField.Root>

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="addition notes" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                

                <br /> {/* Add a line break */}
                
                <Button disabled={isLoading}>
                    {isLoading ? <Spinner /> : 'Submit New Contact'}
                </Button>
                {/* <Spinner/> */}
            </form>
        </div>
    );
}