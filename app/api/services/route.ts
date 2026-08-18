import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL SERVICES
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

// CREATE SERVICE
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image || null,
        icon: body.icon || null,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create service",
      },
      { status: 500 }
    );
  }
}