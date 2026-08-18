import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

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

    let imagePath = null;

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${imageFile.name}`;

      fs.writeFileSync(
        path.join(uploadDir, fileName),
        buffer
      );

      imagePath = `/uploads/${fileName}`;
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