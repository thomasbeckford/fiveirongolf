import React from "react";
import { prisma } from "@/lib/prisma";

export const generateStaticParams = async () => {
  const locations = await prisma.location.findMany();
  return locations.map((location) => ({ slug: location.slug }));
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
