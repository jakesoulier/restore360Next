'use client'

import { Button, Table, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { collection, query, getDocs } from 'firebase/firestore'
import { db } from "@/app/firestoreConfig";
import { useEffect, useState } from 'react';
import { MdModeEdit } from "react-icons/md";
import { ThemePanel } from '@radix-ui/themes';

interface Contact {
  name: string;
  email: string;
  description: string;
}

async function getDataFromFirestore() {
  const q = query(collection(db, "contacts"));
  const querySnapshot = await getDocs(q);
  const contacts = querySnapshot.docs.map((doc) => doc.data() as Contact);
  return contacts
}

const contactList = () => {

  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
      const fetchData = async () => {
        const contacts = await getDataFromFirestore();
        setContacts(contacts);
      };
  
      fetchData();
    }, []);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<Contact | null>(null);

  const handleEditProfile = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedContact(null);
    setIsDialogOpen(false);
  };

const iconStyle = { color: 'black'}


// const iconStyle = { color: 'black' };
const iconStyleHover = { backgroundColor: 'red' };
// const iconStyleHover = { color: 'black'}
// const iconStyleHover = { color: 'black'}
  return (
    <div>
      {/* <ThemePanel/> */}
      <Button><Link href='/contacts/new'>New Contact</Link></Button>
      <Table.Root variant='surface' className='mt-4'>
        <Table.Header>
          <Table.Row >
            <Table.Cell >Name</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Description</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts.map((contact, index) => (
            <Table.Row
              key={index}
              
            >

              <Table.Cell 
              className='flex items-center space-x-4 p-0'
              // style={{padding: '5px'}}
                
              >
                
                <Table.Row
                  className=""
                  style={{ padding: '5px', borderRadius: '3px', backgroundColor: hoveredContact === contact ? 'black' : 'transparent', color: hoveredContact === contact ? 'white' : 'transparent' }}
                  key={index}
                  onMouseEnter={() => setHoveredContact(contact)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  {hoveredContact === contact ? (
                    <MdModeEdit  />
                  ) : (
                    <MdModeEdit style={iconStyle} />
                  )}
                </Table.Row>
                
                <span className=''>{contact.name}</span>
              </Table.Cell>
              <Table.Cell>{contact.email}</Table.Cell>
              <Table.Cell>{contact.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger />
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
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
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={handleCloseDialog}>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}

export default contactList
