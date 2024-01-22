'use client';
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firestoreConfig";

// interface ContactForm {
//     name: string;
//     email: string;
//     description: string;
// }
export async function addDataToFirestore(name: string, email: string, description: string) {
    const docRef = await addDoc(collection(db, "contacts"), {
        name: name,
        email: email,
        description: description,
    });
    console.log("Document written with ID: ", docRef.id);
}
