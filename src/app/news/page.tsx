import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import LayoutClient from "../ui/layout-client";
import FooterServer from "../ui/footer-server";
import Navbar from "../ui/navbar";
import NewsList from "./ui/news-list";
import type { PostData } from "./ui/news-list";

export const metadata: Metadata = {
  title: "News — Harvey Specter",
  description: "Latest news, insights, and achievements from Harvey Specter Studio.",
};

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, category, excerpt, coverImage
}`

export default async function NewsPage() {
  const posts = await client.fetch<PostData[]>(POSTS_QUERY, {}, { next: { revalidate: 30 } });

  return (
    <LayoutClient footer={<FooterServer />}>
      <Navbar />
      <NewsList posts={posts ?? []} />
    </LayoutClient>
  );
}
