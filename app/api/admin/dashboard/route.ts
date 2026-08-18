import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      properties,
      categories,
      projects,
      services,
      agents,
      testimonials,
      users,
      contacts,
      enquiries,
      recentProperties,
      recentAgents,
      recentContacts,
      recentEnquiries,
      recentTestimonials,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.category.count(),
      prisma.project.count(),
      prisma.service.count(),
      prisma.agent.count(),
      prisma.testimonial.count(),
      prisma.admin.count(),
      prisma.contact.count(),
      prisma.enquiry.count(),

      prisma.property.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        include: {
          category: true,
        },
      }),

      prisma.agent.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.contact.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.enquiry.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.testimonial.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      success: true,

      stats: {
        properties,
        categories,
        projects,
        services,
        agents,
        testimonials,
        users,
        contacts,
        enquiries,
      },

      recentProperties,
      recentAgents,
      recentContacts,
      recentEnquiries,
      recentTestimonials,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}