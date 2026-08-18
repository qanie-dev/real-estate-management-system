"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="bg-[#F4F7FC] min-h-screen">

      <Sidebar />

      <main className="ml-72 p-8">
        {children}
      </main>

    </div>
  );
}