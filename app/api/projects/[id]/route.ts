import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE PROJECT

export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(project);
}

// UPDATE PROJECT

export async function PUT(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const body = await request.json();

  const project = await prisma.project.update({
    where: {
      id: Number(id),
    },
    data: {
      title: body.title,
      description: body.description,
      image: body.image,
      location: body.location,
      status: body.status,
    },
  });

  return NextResponse.json(project);
}

// DELETE PROJECT

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.project.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Project Deleted Successfully",
  });
}