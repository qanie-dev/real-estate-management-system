import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL HERO SECTIONS
export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(heroes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch hero sections",
      },
      { status: 500 }
    );
  }
}

// CREATE HERO
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const hero = await prisma.hero.create({
      data: {
        heading: body.heading,
        subHeading: body.subHeading,
        description: body.description,
        backgroundImage: body.backgroundImage,
        searchPlaceholder: body.searchPlaceholder,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create hero",
      },
      { status: 500 }
    );
  }
}