import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE USER

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const user = await prisma.admin.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json(user);
}

// UPDATE USER

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { name, email, password } = body;

    let data: any = {
      name,
      email,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE USER

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  await prisma.admin.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "User deleted successfully",
  });
}