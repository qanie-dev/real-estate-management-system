import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET ONE CATEGORY
export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(category);
}

// UPDATE CATEGORY
export async function PUT(
  request: Request,
  { params }: Params
) {
  const { id } = await params;
  const body = await request.json();

  const category = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      image: body.image,
    },
  });

  return NextResponse.json(category);
}

// DELETE CATEGORY
export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Category Deleted",
  });
}