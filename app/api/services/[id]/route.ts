import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE SERVICE
export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(service);
}

// UPDATE SERVICE
export async function PUT(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const body = await request.json();

  const service = await prisma.service.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
      icon: body.icon,
    },
  });

  return NextResponse.json(service);
}

// DELETE SERVICE
export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.service.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Service Deleted Successfully",
  });
}