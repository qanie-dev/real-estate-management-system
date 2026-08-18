import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all categories from the database
    const categories = await prisma.category.findMany();

    // If no categories exist, return an empty array
    if (!categories || categories.length === 0) {
      return NextResponse.json([]);
    }

    // For each category, count how many properties belong to it
    const result = await Promise.all(
      categories.map(async (category) => {
        const count = await prisma.property.count({
          where: {
            category:{
              name: category.name,
            }
          },
        });

        return {
          id: category.id,
          name: category.name,
          image: category.image || "/images/placeholder-category.jpg",
          count,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
    
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}