import { client } from '@/sanity/lib/client';
import LayoutClient from './ui/layout-client';
import FooterServer from './ui/footer-server';
import Navbar from './ui/navbar';
import HeroSection from './ui/hero-section';
import AboutSection from './ui/about-section';
import BioSection from './ui/bio-section';
import PhotoBreak from './ui/photo-break';
import ServicesSection from './ui/services-section';
import WorkSection from './ui/work-section';
import TestimonialsSection from './ui/testimonials-section';
import NewsSection from './ui/news-section';
import type { TestimonialData } from './ui/testimonials-section';

const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc)[0..3] {
  _id, author, quote, logo, rotation
}`

const SETTINGS_QUERY = `*[_id == "siteSettings"][0]{ bio }`

export default async function Home() {
  const [testimonials, settings] = await Promise.all([
    client.fetch<TestimonialData[]>(TESTIMONIALS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<{ bio?: string }>(SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BioSection bio={settings?.bio} />
      <PhotoBreak />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection testimonials={testimonials ?? []} />
      <NewsSection />
    </LayoutClient>
  );
}
