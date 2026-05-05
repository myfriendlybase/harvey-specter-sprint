import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import LayoutClient from "../ui/layout-client";
import FooterServer from "../ui/footer-server";
import Navbar from "../ui/navbar";
import ContactSection from "./ui/contact-section";

export const metadata: Metadata = {
  title: "Contact — Harvey Specter",
  description: "Get in touch to discuss your next brand, web, marketing, or photography project.",
};

const SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  email, location, isAvailable, availabilityLabel, socialLinks
}`

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) { title }`

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    client.fetch<{
      email?: string;
      location?: string;
      isAvailable?: boolean;
      availabilityLabel?: string;
      socialLinks?: { platform: string; url: string }[];
    }>(SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<{ title: string }[]>(SERVICES_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <ContactSection
        email={settings?.email}
        location={settings?.location}
        isAvailable={settings?.isAvailable}
        availabilityLabel={settings?.availabilityLabel}
        socialLinks={settings?.socialLinks}
        serviceOptions={services?.map((s) => s.title) ?? []}
      />
    </LayoutClient>
  );
}
