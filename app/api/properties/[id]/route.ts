import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET SINGLE PROPERTY
export async function GET(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(property);
}

import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const city = formData.get("city") as string;
    const location = formData.get("location") as string;
    const categoryId = Number(formData.get("categoryId"));
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const area = formData.get("area") as string;
    const featured = formData.get("featured") === "true";
    const status = formData.get("status") as string;

    let imagePath: string | undefined;

    const image = formData.get("image") as File | null;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${image.name}`;

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        filename
      );

      await writeFile(uploadPath, buffer);

      imagePath = `/uploads/${filename}`;
    }

    const property = await prisma.property.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        price: Number(price),
        city,
        location,
        category: {
    connect: {
      id: categoryId,
    },
  },
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area,
        featured,
        status,

        ...(imagePath && { image: imagePath }),
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Update failed",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE PROPERTY
export async function DELETE(
  request: Request,
  { params }: Params
) {
  const { id } = await params;

  await prisma.property.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    message: "Property Deleted",
  });
}