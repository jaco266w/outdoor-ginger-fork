import Hero from "@/components/generel/Hero";
import { client } from "@/lib/sanity/client";

import NewsletterBanner from "@/components/generel/NewsletterBanner";
import Globe from "@/components/generel/Globe";
import BlogOverview from "@/components/generel/BlogOverview";

const postQuery =
  '*[_type == "post"]{title, slug, author, publishedAt, mainImage, content, Latitude, Longitude}';

const posts = await client.fetch(postQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});

export default function Page() {
  return (
    <main>
      <Hero
        title="Campfire Chronicles"
        imageSrc="/bloghero2.png"
        objPos="object-bottom"
        height="h-96 md:h-[50vh]"
        padding="pb-20 md:pb-12"
      >
        <div id="left" className="w-[200%] md:w-full md:mb-12">
          <p className="text-xl md:text-2xl font-medium opacity-70 font-display text-ogBG-base">
            The Outdoor Ginger Blog
          </p>
        </div>
      </Hero>
      <Globe posts={posts} />
      <BlogOverview posts={posts} />
      <NewsletterBanner title="Stay up to date" subtitle="" />
    </main>
  );
}
