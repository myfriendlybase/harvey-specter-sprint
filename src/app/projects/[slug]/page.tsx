import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import LayoutClient from "../../ui/layout-client";
import FooterServer from "../../ui/footer-server";
import Navbar from "../../ui/navbar";
import ProjectDetail from "./ui/project-detail";
import type { ProjectDetailData, ProjectPreview } from "./ui/project-detail";

const PROJECT_QUERY = `*[_type == "portfolio" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  subtitle,
  description,
  client,
  year,
  link,
  tags,
  image,
  gallery
}`;

const MORE_QUERY = `*[_type == "portfolio" && slug.current != $slug] | order(order asc)[0...4] {
  _id, title, slug, tags, image
}`;

const ALL_SLUGS_QUERY = `*[_type == "portfolio"]{ "slug": slug.current }`;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch<ProjectDetailData | null>(
    PROJECT_QUERY,
    { slug },
    { next: { revalidate: 30 } }
  );

  if (!project) return { title: "Project — Harvey Specter" };

  return {
    title: `${project.title} — Harvey Specter`,
    description: project.subtitle ?? project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, moreProjects] = await Promise.all([
    client.fetch<ProjectDetailData | null>(PROJECT_QUERY, { slug }, { next: { revalidate: 30 } }),
    client.fetch<ProjectPreview[]>(MORE_QUERY, { slug }, { next: { revalidate: 30 } }),
  ]);

  if (!project) notFound();

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <ProjectDetail project={project} moreProjects={moreProjects} />
    </LayoutClient>
  );
}
