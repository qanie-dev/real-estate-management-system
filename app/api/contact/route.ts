import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL MESSAGES

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch messages",
      },
      { status: 500 }
    );
  }
}

// SEND MESSAGE

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}