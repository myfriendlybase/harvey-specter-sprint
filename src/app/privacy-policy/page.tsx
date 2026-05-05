import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import LayoutClient from '../ui/layout-client';
import FooterServer from '../ui/footer-server';
import Navbar from '../ui/navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy — Harvey Specter',
  description: 'How we collect, use, and protect your personal information.',
};

interface ListItem {
  _key: string;
  label?: string;
  text: string;
}

interface Section {
  _key: string;
  heading: string;
  body?: string;
  items?: ListItem[];
}

interface LegalPage {
  title: string;
  lastUpdated?: string;
  sections: Section[];
}

const QUERY = `*[_type == "legalPage" && slug.current == "privacy-policy"][0]{
  title, lastUpdated,
  sections[]{ _key, heading, body, items[]{ _key, label, text } }
}`;

export default async function PrivacyPolicyPage() {
  const page = await client.fetch<LegalPage>(QUERY, {}, { next: { revalidate: 60 } });

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <main className="min-h-screen bg-[#fafafa] px-6 md:px-[32px] pt-[120px] pb-[80px]">
        <div className="max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#1f1f1f]/50 mb-6">Legal</p>
          <h1 className="font-semibold text-[48px] md:text-[72px] leading-[0.9] tracking-[-0.04em] uppercase text-[#1f1f1f] mb-[64px]">
            {page?.title ?? 'Privacy Policy'}
          </h1>

          <div className="flex flex-col gap-[48px] font-normal text-[16px] leading-[1.7] text-[#1f1f1f]/80">
            {page?.sections?.map((section, i) => (
              <div key={section._key} className="flex flex-col gap-[48px]">
                {i > 0 && <hr className="border-0 border-t border-[#1f1f1f]/10" />}
                <section className="flex flex-col gap-4">
                  <h2 className="font-semibold text-[13px] uppercase tracking-[0.08em] text-[#1f1f1f]">
                    {section.heading}
                  </h2>
                  {section.body && (
                    <div className="flex flex-col gap-3">
                      {section.body.split('\n\n').map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  )}
                  {section.items && section.items.length > 0 && (
                    <ul className="flex flex-col gap-3 pl-4 border-l border-[#1f1f1f]/10">
                      {section.items.map((item) => (
                        <li key={item._key}>
                          {item.label
                            ? <><span className="font-medium text-[#1f1f1f]">{item.label}</span> — {item.text}</>
                            : item.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            ))}

            {page?.lastUpdated && (
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#1f1f1f]/40 pt-8 border-t border-[#1f1f1f]/10">
                Last updated: {page.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </main>
    </LayoutClient>
  );
}
