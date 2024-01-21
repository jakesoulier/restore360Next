import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

const createContactSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1),
 });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createContactSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  
  const newContact = await prisma.contact.create({
    data: { title: body.title, description: body.description }
  })

  return NextResponse.json(newContact, { status: 201 })
}