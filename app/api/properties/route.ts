import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Error fetching properties",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));

    const city = formData.get("city") as string;
    const location = formData.get("location") as string;

    const categoryId = Number(formData.get("categoryId"));

    const bedrooms = Number(formData.get("bedrooms"));
    const bathrooms = Number(formData.get("bathrooms"));

    const area = formData.get("area") as string;

    const featured = formData.get("featured") === "true";

    const status = formData.get("status") as string;

    const imageFile = formData.get("image") as File | null;

    let imagePath: string | null = null;

    if (imageFile && imageFile.size > 0) {
      // Check that the file is an image
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          {
            message: "Only image files are allowed",
          },
          { status: 400 }
        );
      }

      // Convert image to base64
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");

      const dataUri = `data:${imageFile.type};base64,${base64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "real-estate/properties",
        resource_type: "image",
      });

      imagePath = result.secure_url;
    }

    console.log({
      title,
      description,
      price,
      city,
      location,
      categoryId,
      bedrooms,
      bathrooms,
      area,
      featured,
      status,
      imagePath,
    });

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,

        city,
        location,

        category: {
          connect: {
            id: categoryId,
          },
        },

        bedrooms,
        bathrooms,

        area,

        image: imagePath,

        featured,

        status,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("PROPERTY ERROR:", error);

    return NextResponse.json(
      {
        message: "Error creating property",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}