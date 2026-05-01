const post1Img = "https://www.figma.com/api/mcp/asset/342d1835-abca-48a7-a7ca-91bb05feb7ea";
const post2Img = "https://www.figma.com/api/mcp/asset/7cabe990-f01b-4952-a40e-254593521320";
const post3Img = "https://www.figma.com/api/mcp/asset/68a94317-6e18-4f67-8198-4d6411611109";

const posts = [
  { img: post1Img, offset: false },
  { img: post2Img, offset: true  },
  { img: post3Img, offset: false },
];

const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReadMore() {
  return (
    <a href="#" className="flex gap-[10px] items-center border-b border-black pb-1 w-fit group">
      <span className="font-medium text-[14px] text-black tracking-[-0.56px] leading-normal">Read more</span>
      <ArrowUpRight />
    </a>
  );
}

function PostCard({ img, description: desc, offset }: { img: string; description: string; offset: boolean }) {
  return (
    <div className={`flex flex-col gap-4 items-start${offset ? " md:pt-[120px]" : ""}`}>
      <div className="relative w-full h-[398px] md:h-[469px] overflow-hidden shrink-0">
        <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </div>
      <p className="font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3]">{desc}</p>
      <ReadMore />
    </div>
  );
}

export default function NewsSection() {
  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-end gap-[250px] pl-8 py-[120px] overflow-hidden">

        {/* Rotated heading — stays fixed on the left */}
        <div className="flex h-[706px] w-[110px] items-center justify-center shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <p className="font-light text-black uppercase tracking-[-5.12px] leading-[0.86] text-[64px]">
              Keep up with my latest
            </p>
            <p className="font-light text-black uppercase tracking-[-5.12px] leading-[0.86] text-[64px]">
              news &amp; achievements
            </p>
          </div>
        </div>

        {/* Horizontally scrollable cards — fixed width per card, 3rd crops at edge */}
        <div className="overflow-x-auto no-scrollbar flex-1">
          <div className="flex items-start gap-[31px] w-max pr-8">
            {posts.map((post, i) => (
              <div key={post.img} className="contents">
                {i > 0 && <div className="w-px bg-black/20 shrink-0 h-[469px] self-start" />}
                <div className="w-[353px] shrink-0">
                  <PostCard img={post.img} description={description} offset={post.offset} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <p className="font-light text-black uppercase tracking-[-2.56px] leading-[0.86] text-[32px]">
          Keep up with my latest news &amp; achievements
        </p>
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {posts.map((post) => (
              <div key={post.img} className="w-[300px] shrink-0">
                <PostCard img={post.img} description={description} offset={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
