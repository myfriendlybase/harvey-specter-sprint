import { client } from '@/sanity/lib/client';

interface Award {
  _id: string;
  year: string;
  title: string;
  org: string;
}

const AWARDS_QUERY = `*[_type == "award"] | order(order asc) { _id, year, title, org }`

const FALLBACK_AWARDS: Award[] = [
  { _id: '1', year: '2024', title: 'Awwwards — Site of the Day',         org: 'Awwwards' },
  { _id: '2', year: '2024', title: 'CSS Design Awards — Best UI Design', org: 'CSSDA'    },
  { _id: '3', year: '2023', title: 'Communication Arts — Photo Annual',  org: 'CA'       },
  { _id: '4', year: '2022', title: 'FWA — Site of the Month',            org: 'FWA'      },
  { _id: '5', year: '2021', title: 'Dribbble — Top Creative Director',   org: 'Dribbble' },
];

export default async function RecognitionSection() {
  const awardsData = await client.fetch<Award[]>(AWARDS_QUERY, {}, { next: { revalidate: 60 } });

  const awards = awardsData.length ? awardsData : FALLBACK_AWARDS;

  return (
    <section className="bg-[#f3f3f3] px-4 py-12 md:px-8 md:py-[80px]">
      <div className="flex flex-col gap-3 items-end mb-10 md:mb-16">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1] text-right">[ recognition ]</p>
        <hr className="w-full border-0 border-t border-black/20" />
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-mono text-sm text-[#1f1f1f] uppercase leading-[1.1]">[ awards ]</p>
        <div className="flex flex-col">
          {awards.map(({ _id, year, title, org }) => (
            <div
              key={_id}
              className="group flex items-start gap-4 py-4 border-b border-black/10 hover:border-black transition-colors duration-200 cursor-default"
            >
              <p className="font-mono text-sm text-[#1f1f1f]/40 leading-[1.1] w-10 shrink-0 pt-[2px]">{year}</p>
              <p className="text-sm text-[#1f1f1f] tracking-[-0.035em] leading-[1.3] flex-1 transition-transform duration-300 ease-out group-hover:translate-x-1">{title}</p>
              <p className="font-mono text-[11px] text-[#1f1f1f]/40 uppercase shrink-0 pt-[2px]">{org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
