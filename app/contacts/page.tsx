'use client'

import { Button, Table, Dialog, Flex, Text, TextField, Avatar, Box } from '@radix-ui/themes'
import Link from 'next/link'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from "@/app/firestoreConfig";
import { useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { ThemePanel } from '@radix-ui/themes';
import { addDataToFirestore } from '../components/addDataToFirestore';
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select } from "@radix-ui/themes";
import { createContactSchema } from '../validationSchemas';
import { z } from 'zod';
import { Contact } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

type ContactForm = z.infer<typeof createContactSchema>;

async function getDataFromFirestore() {
  const q = query(collection(db, "contacts"));
  const querySnapshot = await getDocs(q);
  const contacts = querySnapshot.docs.map((doc) => doc.data() as ContactForm);
  return contacts
}

const contactList = () => {

  const [contacts, setContacts] = useState<ContactForm[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        const contacts = await getDataFromFirestore();
        setContacts(contacts);
      };
  
      fetchData();
    }, []);

  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<ContactForm | null>(null);

  const handleEditProfile = (contact: ContactForm) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedContact(null);
    setIsDialogOpen(false);
  };

const { register, handleSubmit, control, formState: {errors} } = useForm<ContactForm>({
  resolver: zodResolver(createContactSchema)
});

const onSubmit = async (data: Record<string, any>) => {
  console.log('made it to onSubmit')
  const { name, email, description } = data;
  alert(name)
  try {
    const added = await addDataToFirestore(name, email, description);
    // Do something with the added data if needed
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div>
      <Button><Link href='/contacts/new'>New Contact</Link></Button>

      <Table.Root variant='surface' className='mt-4'>
        <Table.Header>
          <Table.Row >
            <Table.Cell >Name - add filter icon</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Description</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts.map((contact, index) => (
            <Table.Row key={index}>
              <Table.Cell className='flex items-center space-x-4 p-0' >

                <Dialog.Root> 

                  <Table.Row
                    style={{ padding: '5px', borderRadius: '3px', backgroundColor: hoveredContact === contact ? 'black' : 'transparent', color: hoveredContact === contact ? 'white' : 'transparent' }}
                    key={index}
                    onMouseEnter={() => setHoveredContact(contact)}
                    onMouseLeave={() => setHoveredContact(null)}
                  >
                    {hoveredContact === contact ? (
                      <Dialog.Trigger>
                        <Button 
                          onClick={() => handleEditProfile(contact)}
                          style={{backgroundColor: 'black'}}
                        >
                            <MdModeEdit />
                        </Button>
                      </Dialog.Trigger>
                    ) : (
                      <Button 
                        onClick={() => handleEditProfile(contact)} 
                        style={{backgroundColor: 'white', color: 'black'}}>
                        <MdModeEdit />
                      </Button>
                    )}
                  </Table.Row>
                  <span className="hover:bg-gray-200"><Link href='/contacts/client'>{contact.name}</Link></span>
                  
                  <Dialog.Content style={{ maxWidth: 450 }}>
                  
                    {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                      <Dialog.Title>Edit profile ----------- x icon</Dialog.Title>
                      <Dialog.Description size="2" mb="4">
                      <Flex justify="between" align="center">
                        Make changes to your profile.
                          <Flex gap="2">
                          <Avatar
                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                            fallback="A"
                          />
                          <Avatar 
                            fallback={
                              <Box width="5" height="5">
                                <svg viewBox="0 0 64 64" fill="currentColor">
                                  <path d="M41.5 14c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S33 27.962 33 23 36.813 14 41.5 14zM56.289 43.609C57.254 46.21 55.3 49 52.506 49c-2.759 0-11.035 0-11.035 0 .689-5.371-4.525-10.747-8.541-13.03 2.388-1.171 5.149-1.834 8.07-1.834C48.044 34.136 54.187 37.944 56.289 43.609zM37.289 46.609C38.254 49.21 36.3 52 33.506 52c-5.753 0-17.259 0-23.012 0-2.782 0-4.753-2.779-3.783-5.392 2.102-5.665 8.245-9.472 15.289-9.472S35.187 40.944 37.289 46.609zM21.5 17c4.687 0 8.5 4.038 8.5 9s-3.813 9-8.5 9S13 30.962 13 26 16.813 17 21.5 17z" />
                                </svg>
                              </Box>
                            }
                          />
                          </Flex>
                        </Flex>
                      </Dialog.Description>

                      <Flex direction="column" gap="3">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <label>
                        
                          <Text as="div" size="2" mb="1" >
                            Name
                          </Text>
                          <TextField.Input
                            defaultValue={selectedContact?.name}
                            placeholder="Enter your full name"
                          />
                          
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Email
                          </Text>
                          <TextField.Input
                            defaultValue={selectedContact?.email}
                            placeholder="Enter your email"
                          />
                        </label>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            Description
                          </Text>
                          <Controller
                            name='description'
                            control={control}
                            defaultValue={selectedContact?.description}
                            render={({ field }) => (<SimpleMDE placeholder="make edit" {...field}/>)}
                          />
                        </label>
                        <Button>submit</Button>
                      </form>
                      </Flex>

                      {/* <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                          
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button>Save</Button>
                          
                        </Dialog.Close>
                      </Flex> */}
                      {/* <Button>submit</Button>
                    </form> */}
                    
                  </Dialog.Content>
                  
                </Dialog.Root>
              </Table.Cell>
              <Table.Cell>{contact.email}</Table.Cell>
              <Table.Cell>{contact.description}</Table.Cell>
            </Table.Row>
          ))}
            
        </Table.Body>
      </Table.Root>
      
    </div>
  )
}

export default contactList
