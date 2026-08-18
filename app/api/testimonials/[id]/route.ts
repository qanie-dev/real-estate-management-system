import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE TESTIMONIAL
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!testimonial) {
      return NextResponse.json(
        {
          message: "Testimonial not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error fetching testimonial",
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE TESTIMONIAL
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const testimonial = await prisma.testimonial.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        designation: body.designation,
        message: body.message,
        rating: Number(body.rating),
        image: body.image,
        active: body.active,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update testimonial",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE TESTIMONIAL
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.testimonial.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete testimonial",
      },
      {
        status: 500,
      }
    );
  }
}