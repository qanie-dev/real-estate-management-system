import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const enquiry = await prisma.enquiry.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(enquiry);
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.enquiry.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Deleted Successfully",
  });
}