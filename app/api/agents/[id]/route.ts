import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE AGENT
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const agent = await prisma.agent.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!agent) {
      return NextResponse.json(
        { message: "Agent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}

// UPDATE AGENT
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const updated = await prisma.agent.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        designation: body.designation,
        email: body.email,
        phone: body.phone,

        image: body.image,

        experience: body.experience,
        address: body.address,
        description: body.description,

        facebook: body.facebook,
        instagram: body.instagram,
        linkedin: body.linkedin,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update agent" },
      { status: 500 }
    );
  }
}

// DELETE AGENT
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.agent.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete agent" },
      { status: 500 }
    );
  }
}