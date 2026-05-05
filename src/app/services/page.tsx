import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import LayoutClient from "../ui/layout-client";
import FooterServer from "../ui/footer-server";
import Navbar from "../ui/navbar";
import ServicesHero from "./ui/services-hero";
import ServicesList from "./ui/services-list";
import ProcessSection from "./ui/process-section";
import ServicesCta from "./ui/services-cta";
import type { ServiceData } from "./ui/services-list";

export const metadata: Metadata = {
  title: "Services — Harvey Specter",
  description: "Brand discovery, web design & development, marketing, and photography. Full-service creative studio based in Chicago.",
};

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, title, num, tag, description, deliverables, image
}`

export default async function ServicesPage() {
  const services = await client.fetch<ServiceData[]>(SERVICES_QUERY, {}, { next: { revalidate: 60 } });

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <ServicesHero />
      <ServicesList services={services ?? []} />
      <ProcessSection />
      <ServicesCta />
    </LayoutClient>
  );
}
