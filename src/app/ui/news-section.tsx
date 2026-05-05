import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { NewsHeadingAnimation, NewsCardAnimation } from './news-animations';

interface PostPreview {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
}

const QUERY = `*[_type == "post"] | order(publishedAt desc)[0..2] {
  _id, title, slug, excerpt, coverImage
}`

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4 14L14 4M14 4H7M14 4V11" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReadMore({ href }: { href: string }) {
  return (
    <a href={href} className="flex gap-[10px] items-center border-b border-black pb-1 w-fit group/link">
      <span className="font-medium text-[14px] text-black tracking-[-0.56px] leading-normal">Read more</span>
      <span className="transition-transform duration-300 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
        <ArrowUpRight />
      </span>
    </a>
  );
}

function PostCard({ post, offset }: { post: PostPreview; offset: boolean }) {
  const imgSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(706).url()
    : null;

  return (
    <a href={`/news/${post.slug.current}`} className={`group flex flex-col gap-4 items-start${offset ? ' md:pt-[120px]' : ''}`}>
      <div className="relative w-full h-[398px] md:h-[469px] overflow-hidden shrink-0 bg-[#e8e8e8]">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
      </div>
      <p className="font-normal text-[14px] text-[#1f1f1f] tracking-[-0.56px] leading-[1.3] transition-opacity duration-300 group-hover:opacity-70">
        {post.excerpt ?? post.title}
      </p>
      <ReadMore href={`/news/${post.slug.current}`} />
    </a>
  );
}

export default async function NewsSection() {
  const posts: PostPreview[] = await client.fetch(QUERY, {}, { next: { revalidate: 30 } });

  if (!posts.length) return null;

  const offsets = [false, true, false];

  return (
    <section id="news" className="bg-[#f3f3f3]">

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:flex items-end gap-[250px] pl-8 py-[120px] overflow-hidden">
        <NewsHeadingAnimation>
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
        </NewsHeadingAnimation>

        <div className="overflow-x-auto no-scrollbar flex-1">
          <div className="flex items-start gap-[31px] w-max pr-8">
            {posts.map((post, i) => (
              <div key={post._id} className="contents">
                {i > 0 && <div className="w-px bg-black/20 shrink-0 h-[469px] self-start" />}
                <div className="w-[353px] shrink-0">
                  <NewsCardAnimation delay={i * 0.12}>
                    <PostCard post={post} offset={offsets[i] ?? false} />
                  </NewsCardAnimation>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col gap-8 px-4 py-16">
        <NewsHeadingAnimation>
          <p className="font-light text-black uppercase tracking-[-2.56px] leading-[0.86] text-[32px]">
            Keep up with my latest news &amp; achievements
          </p>
        </NewsHeadingAnimation>
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {posts.map((post, i) => (
              <div key={post._id} className="w-[300px] shrink-0">
                <NewsCardAnimation delay={i * 0.12}>
                  <PostCard post={post} offset={false} />
                </NewsCardAnimation>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
