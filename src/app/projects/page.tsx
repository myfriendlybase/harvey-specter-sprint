import type { Metadata } from "next";
import LayoutClient from "../ui/layout-client";
import FooterServer from "../ui/footer-server";
import Navbar from "../ui/navbar";
import ProjectsGrid from "./ui/projects-grid";
import { client } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Projects — Harvey Specter",
  description: "Selected work across brand discovery, web design & development, marketing, and photography.",
};

const PORTFOLIO_QUERY = `*[_type == "portfolio"] | order(order asc) {
  _id,
  title,
  slug,
  image,
  tags,
  tall
}`;

export default async function ProjectsPage() {
  const projects = await client.fetch(PORTFOLIO_QUERY, {}, { next: { revalidate: 30 } });

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <ProjectsGrid projects={projects} />
    </LayoutClient>
  );
}
