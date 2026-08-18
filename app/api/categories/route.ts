import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const category = await prisma.category.create({
      data: {
        name: body.name,
        image: body.image
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating category",
        error,
      },
      { status: 500 }
    );
  }
}