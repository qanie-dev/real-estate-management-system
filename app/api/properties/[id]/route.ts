import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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
  try {
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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error fetching property",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// UPDATE PROPERTY
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

    // Upload new image to Cloudinary if one was selected
    if (image && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return NextResponse.json(
          {
            message: "Only image files are allowed",
          },
          { status: 400 }
        );
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");

      const dataUri = `data:${image.type};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "real-estate/properties",
        resource_type: "image",
      });

      imagePath = result.secure_url;
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

        ...(imagePath && {
          image: imagePath,
        }),
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("PROPERTY UPDATE ERROR:", error);

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
  try {
    const { id } = await params;

    await prisma.property.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Property Deleted",
    });
  } catch (error) {
    console.error("PROPERTY DELETE ERROR:", error);

    return NextResponse.json(
      {
        message: "Delete failed",
        error: String(error),
      },
      { status: 500 }
    );
  }
}