import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch enquiries",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const enquiry = await prisma.enquiry.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      },
    });

    return NextResponse.json(enquiry);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to send enquiry",
      },
      {
        status: 500,
      }
    );
  }
}