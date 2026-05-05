import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import LayoutClient from '../ui/layout-client';
import FooterServer from '../ui/footer-server';
import Navbar from '../ui/navbar';
import StatementHero from './ui/statement-hero';
import OriginSection from './ui/origin-section';
import StatsSection from './ui/stats-section';
import ExperienceSection from './ui/experience-section';
import RecognitionSection from './ui/recognition-section';
import type { MilestoneData } from './ui/origin-section';
import type { StatData } from './ui/stats-section';

export const metadata: Metadata = {
  title: 'About — Harvey Specter',
  description: 'Creative Director & Photographer. 8+ years shaping brand identities and visual stories. Based in Chicago.',
};

const MILESTONES_QUERY = `*[_type == "milestone"] | order(order asc) { _id, year, heading, body }`
const SETTINGS_QUERY   = `*[_id == "aboutSettings"][0]{ stats }`

export default async function AboutPage() {
  const [milestones, settings] = await Promise.all([
    client.fetch<MilestoneData[]>(MILESTONES_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<{ stats?: StatData[] }>(SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <StatementHero />
      <OriginSection milestones={milestones ?? []} />
      <StatsSection stats={settings?.stats} />
      <ExperienceSection />
      <RecognitionSection />
    </LayoutClient>
  );
}
