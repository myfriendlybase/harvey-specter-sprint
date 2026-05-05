import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import LayoutClient from "../../ui/layout-client";
import FooterServer from "../../ui/footer-server";
import Navbar from "../../ui/navbar";
import NewsDetail from "./ui/news-detail";
import type { NewsDetailData, PostPreview } from "./ui/news-detail";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, category, excerpt, coverImage, body
}`;

const MORE_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
  _id, title, slug, publishedAt, category, excerpt, coverImage
}`;

const ALL_SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`;

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
  const post = await client.fetch<NewsDetailData | null>(
    POST_QUERY,
    { slug },
    { next: { revalidate: 30 } }
  );

  if (!post) return { title: "News — Harvey Specter" };

  return {
    title: `${post.title} — Harvey Specter`,
    description: post.excerpt,
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, morePosts] = await Promise.all([
    client.fetch<NewsDetailData | null>(POST_QUERY, { slug }, { next: { revalidate: 30 } }),
    client.fetch<PostPreview[]>(MORE_QUERY, { slug }, { next: { revalidate: 30 } }),
  ]);

  if (!post) notFound();

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <NewsDetail post={post} morePosts={morePosts} />
    </LayoutClient>
  );
}
