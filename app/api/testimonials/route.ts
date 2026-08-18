import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL TESTIMONIALS
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch testimonials",
      },
      { status: 500 }
    );
  }
}

// CREATE TESTIMONIAL
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        designation: body.designation,
        message: body.message,
        rating: Number(body.rating),
        image: body.image || null,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create testimonial",
      },
      { status: 500 }
    );
  }
}