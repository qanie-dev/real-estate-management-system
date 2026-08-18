import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE HERO
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const hero = await prisma.hero.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!hero) {
      return NextResponse.json(
        {
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error fetching hero",
      },
      { status: 500 }
    );
  }
}

// UPDATE HERO
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const hero = await prisma.hero.update({
      where: {
        id: Number(id),
      },
      data: {
        heading: body.heading,
        subHeading: body.subHeading,
        description: body.description,
        backgroundImage: body.backgroundImage,
        searchPlaceholder: body.searchPlaceholder,
        active: body.active,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to update hero",
      },
      { status: 500 }
    );
  }
}

// DELETE HERO
export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.hero.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Hero deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to delete hero",
      },
      { status: 500 }
    );
  }
}