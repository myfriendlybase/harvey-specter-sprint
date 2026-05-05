import { client } from '@/sanity/lib/client';

interface ExperienceItem {
  _id: string;
  year: string;
  client: string;
  role: string;
  type: string;
}

const QUERY = `*[_type == "experienceItem"] | order(order asc) { _id, year, client, role, type }`

const FALLBACK: ExperienceItem[] = [
  { _id: '1', year: '2024', client: 'Marko & Co.',           role: 'Campaign Direction & Brand Identity',     type: 'Brand'  },
  { _id: '2', year: '2023', client: 'Lukas Weber Studios',   role: 'Product Visualisation & Template Design', type: 'Design' },
  { _id: '3', year: '2023', client: 'Sofia Martínez Group',  role: 'UX Strategy & Web Design',                type: 'Web'    },
  { _id: '4', year: '2022', client: 'Agency 976',            role: 'Visual Identity & Brand System',          type: 'Brand'  },
  { _id: '5', year: '2022', client: 'Surfers Paradise',      role: 'Editorial Photography & Art Direction',   type: 'Photo'  },
  { _id: '6', year: '2021', client: 'Minimal Playground',    role: 'Creative Direction & Digital Experience', type: 'Web'    },
  { _id: '7', year: '2020', client: 'Cyberpunk Caffe',       role: 'Full Brand Identity & Interior Collateral', type: 'Brand' },
];

const typeColors: Record<string, string> = {
  Brand:  'bg-[#1f1f1f] text-white',
  Design: 'bg-[#f3f3f3] text-[#1f1f1f]',
  Web:    'bg-[#f3f3f3] text-[#1f1f1f]',
  Photo:  'bg-[#1f1f1f] text-white',
};

export default async function ExperienceSection() {
  const items: ExperienceItem[] = await client.fetch(QUERY, {}, { next: { revalidate: 60 } });
  const experience = items.length ? items : FALLBACK;

  return (
    <section className="bg-[#fafafa] px-4 py-12 md:px-8 md:py-[80px]">
      <div className="flex items-end justify-between mb-10 md:mb-[48px]">
        <div className="flex gap-[10px] items-start">
          <h2 className="font-light text-black uppercase leading-[0.86] tracking-[-0.08em] text-[32px] md:text-[6.67vw]">
            Selected<br />Experience
          </h2>
          <p className="font-mono text-sm text-[#1f1f1f] leading-[1.1] mt-1">
            {String(experience.length).padStart(2, '0')}
          </p>
        </div>
        <div className="hidden md:flex h-[110px] w-[15px] items-center justify-center">
          <p className="font-mono text-sm text-[#1f1f1f] uppercase whitespace-nowrap -rotate-90 origin-center">[ clients ]</p>
        </div>
      </div>

      <div className="flex flex-col">
        {experience.map(({ _id, year, client: clientName, role, type }) => (
          <div
            key={_id}
            className="group flex items-start gap-4 md:gap-8 py-5 border-b border-black/10 transition-colors duration-200 hover:border-black cursor-default"
          >
            <p className="font-mono text-sm text-[#1f1f1f]/40 leading-[1.1] w-10 shrink-0 pt-[3px]">{year}</p>
            <p className="font-bold italic text-[18px] md:text-[22px] text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.1] flex-1 transition-transform duration-300 ease-out group-hover:translate-x-2">
              {clientName}
            </p>
            <p className="hidden md:block text-sm text-[#1f1f1f]/50 tracking-[-0.035em] leading-[1.3] flex-1 pt-[3px] transition-colors duration-200 group-hover:text-[#1f1f1f]">
              {role}
            </p>
            <span className={`font-mono text-[11px] uppercase tracking-[0.04em] px-2 py-1 rounded-sm shrink-0 ${typeColors[type] ?? 'bg-[#f3f3f3] text-[#1f1f1f]'}`}>
              {type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
