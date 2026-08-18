import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL AGENTS
export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(agents);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

// ADD NEW AGENT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        designation: body.designation,
        email: body.email,
        phone: body.phone,

        image: body.image || "",

        experience: body.experience || "",
        address: body.address || "",
        description: body.description || "",

        facebook: body.facebook || "",
        instagram: body.instagram || "",
        linkedin: body.linkedin || "",
      },
    });

    return NextResponse.json(agent);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create agent" },
      { status: 500 }
    );
  }
}