"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  FolderTree,
  Building,
  Briefcase,
  Users,
  Star,
  Mail,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import DashboardLayout from "@/components/admin/DashboardLayout";

interface DashboardData {
  stats: {
    properties: number;
    categories: number;
    projects: number;
    services: number;
    agents: number;
    testimonials: number;
    users: number;
    contacts: number;
    enquiries: number;
  };

  recentProperties: any[];
  recentAgents: any[];
  recentContacts: any[];
  recentEnquiries: any[];
  recentTestimonials: any[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();

      if (json.success) {
        setData(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 rounded-full border-4 border-[#082B5C] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  const cards = [
    {
      title: "Properties",
      value: data.stats.properties,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: data.stats.categories,
      icon: FolderTree,
      color: "bg-green-500",
    },
    {
      title: "Projects",
      value: data.stats.projects,
      icon: Building,
      color: "bg-purple-500",
    },
    {
      title: "Services",
      value: data.stats.services,
      icon: Briefcase,
      color: "bg-orange-500",
    },
    {
      title: "Agents",
      value: data.stats.agents,
      icon: Users,
      color: "bg-pink-500",
    },
    {
      title: "Testimonials",
      value: data.stats.testimonials,
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      title: "Users",
      value: data.stats.users,
      icon: UserCircle,
      color: "bg-indigo-500",
    },
    {
      title: "Contacts",
      value: data.stats.contacts,
      icon: Mail,
      color: "bg-red-500",
    },
    {
      title: "Enquiries",
      value: data.stats.enquiries,
      icon: MessageSquare,
      color: "bg-teal-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-[#F8FAFC] min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#082B5C]">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back to the HomeLuxe Admin Panel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">
                      {card.title}
                    </p>
                    <h2 className="text-4xl font-bold mt-3 text-[#082B5C]">
                      {card.value}
                    </h2>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-2xl ${card.color} flex items-center justify-center`}
                  >
                    <Icon
                      className="text-white"
                      size={30}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Properties */}
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#082B5C] mb-5">
              Recent Properties
            </h2>
            <div className="space-y-4">
              {data.recentProperties.length === 0 ? (
                <p className="text-gray-500">
                  No properties found.
                </p>
              ) : (
                data.recentProperties.map((property: any) => (
                  <div
                    key={property.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold text-[#082B5C]">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {property.category?.name}
                      </p>
                    </div>
                    <span className="font-semibold text-[#C79A54]">
                      Rs. {Number(property.price).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Agents */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#082B5C] mb-5">
              Recent Agents
            </h2>
            <div className="space-y-4">
              {data.recentAgents.length === 0 ? (
                <p className="text-gray-500">
                  No agents found.
                </p>
              ) : (
                data.recentAgents.map((agent: any) => (
                  <div
                    key={agent.id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold text-[#082B5C]">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {agent.designation}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {agent.city}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Contacts, Enquiries & Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* Recent Contacts */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#082B5C] mb-5">
              Recent Contacts
            </h2>
            <div className="space-y-4">
              {data.recentContacts.length === 0 ? (
                <p className="text-gray-500">
                  No contact messages found.
                </p>
              ) : (
                data.recentContacts.map((contact: any) => (
                  <div
                    key={contact.id}
                    className="border-b pb-3"
                  >
                    <h3 className="font-semibold text-[#082B5C]">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {contact.email}
                    </p>
                    <p className="text-sm mt-1 text-gray-700 line-clamp-2">
                      {contact.subject}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#082B5C] mb-5">
              Recent Enquiries
            </h2>
            <div className="space-y-4">
              {data.recentEnquiries.length === 0 ? (
                <p className="text-gray-500">
                  No enquiries found.
                </p>
              ) : (
                data.recentEnquiries.map((enquiry: any) => (
                  <div
                    key={enquiry.id}
                    className="border-b pb-3"
                  >
                    <h3 className="font-semibold text-[#082B5C]">
                      {enquiry.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {enquiry.email}
                    </p>
                    <p className="text-sm mt-1 text-gray-700 line-clamp-2">
                      {enquiry.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Testimonials */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#082B5C] mb-5">
              Recent Testimonials
            </h2>
            <div className="space-y-4">
              {data.recentTestimonials.length === 0 ? (
                <p className="text-gray-500">
                  No testimonials found.
                </p>
              ) : (
                data.recentTestimonials.map((testimonial: any) => (
                  <div
                    key={testimonial.id}
                    className="border-b pb-3"
                  >
                    <h3 className="font-semibold text-[#082B5C]">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-[#C79A54]">
                      {testimonial.designation}
                    </p>
                    <p className="text-sm mt-2 text-gray-700 line-clamp-3">
                      "{testimonial.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#082B5C]">
                HomeLuxe Admin Dashboard
              </h2>
              <p className="mt-2 text-gray-600">
                Monitor properties, projects, agents, enquiries, testimonials,
                services and website activity from one place.
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">
                Total Records
              </p>
              <h3 className="text-4xl font-bold text-[#C79A54]">
                {data.stats.properties +
                  data.stats.categories +
                  data.stats.projects +
                  data.stats.services +
                  data.stats.agents +
                  data.stats.testimonials +
                  data.stats.users +
                  data.stats.contacts +
                  data.stats.enquiries}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}