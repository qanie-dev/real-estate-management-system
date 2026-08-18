import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE MESSAGE

export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const contact = await prisma.contact.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(contact);
}

// DELETE MESSAGE

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.contact.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Message Deleted",
  });
}