import Hero from "@/components/generel/Hero";
import { client, urlFor } from "@/lib/sanity/client";
import Paywall from "@/components/generel/PayWall";
import ArticleCard from "@/components/generel/ArticleCard";
import ReelEmbed from "@/components/generel/ReelEmbed";
import NewsletterBanner from "@/components/generel/NewsletterBanner";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateStaticParams() {
  const slugQuery = '*[_type == "post"]{slug}';
  const posts = await client.fetch(slugQuery, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
    },
  });

  return posts.map((post) => ({
    params: { slug: post.slug.current },
  }));
}

export default async function Page({ params }) {
  const postQuery =
    '*[_type == "post" && slug.current == $slug]{slug, title, author, publishedAt, mainImage, content, Youtube_Short_URL, Youtube_Short_Title}';

  const post = await client.fetch(postQuery, {
    slug: params.slug,
  });

  const authorQuery = '*[_type == "author"]{_id, name, mainImage, instagram}';
  const authors = await client.fetch(authorQuery);

  const postAuthor = authors.find(
    (author) => author._id === post[0].author._ref,
  );

  const imgUrl = urlFor(post[0].mainImage).url();

  const postsQuery =
    '*[_type == "post"]{title, slug, author, publishedAt, mainImage, content}';

  const posts = await client.fetch(postsQuery, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
    },
  });

  let currentPostSlug = post[0].slug.current;

  let brokenTitle;
  if (post[0].Youtube_Short_Title) {
    const title = post[0].Youtube_Short_Title;
    brokenTitle = breakString(title, 20, 10);
  }

  return (
    <main>
      <Hero imageSrc={imgUrl} height="h-96 md:h-[40vh]"></Hero>
      <nav className="px-8 max-w-5xl mx-auto mb-12">
        <Breadcrumb>
          <BreadcrumbList className="text-ogLabel-faint">
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-ogLabel-faint">
                {post[0].title.length > 30
                  ? post[0].title.substring(0, 30) + "..."
                  : post[0].title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
      <div className="md:relative md:grid grid-cols-blogLayout max-w-5xl mx-auto">
        <article className="row-span-2 prose md:prose-lg prose-neutral mx-auto px-8 pb-12 md:pb-24">
          <h1 className="text-3xl md:text-5xl font-bold">{post[0].title}</h1>
          <p>
            By{" "}
            <a
              href={`https://instagram.com/${postAuthor.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {postAuthor.name}
            </a>{" "}
            on{" "}
            {new Date(post[0].publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <Paywall post={post} />
        </article>

        {post[0].Youtube_Short_URL ? (
          <section className="max-w-sm space-y-8 hidden md:block ">
            <div className="bg-ogPrimary rounded-3xl  relative">
              <ReelEmbed Youtube_Short_URL={post[0].Youtube_Short_URL} />
              {post[0].Youtube_Short_Title && (
                <div className="p-8 pt-20">
                  <p className="text-sm text-ogPrimary-lighter mb-1 font-medium">
                    Related video
                  </p>
                  <h2 className="capitalize text-2xl font-display font-semibold text-ogPrimary-lightest ">
                    {brokenTitle}
                  </h2>
                </div>
              )}
            </div>
            <ArticlesCards posts={posts} currentPostSlug={currentPostSlug} />
          </section>
        ) : (
          <section className="max-w-sm space-y-8 hidden md:block ">
            <ArticlesCards posts={posts} currentPostSlug={currentPostSlug} />
          </section>
        )}
      </div>
      <NewsletterBanner title="Stay up to date" subtitle="" />
    </main>
  );
}

function ArticlesCards({ posts, currentPostSlug }) {
  return (
    <div className="col-start-2 flex flex-col gap-4 px-8 md:px-0 mb-12 max-w-[650px] md:max-w-[730px] mx-auto ">
      {posts
        .filter((post) => post.slug.current !== currentPostSlug)
        .slice(-2)
        .map((post) => {
          return <ArticleCard post={post} key={post.slug.current} />;
        })}
    </div>
  );
}

function breakString(input, firstLineLength, secondLineLength) {
  const words = input.split(" ");
  let line = "";
  let result = [];
  let breakCount = 0;

  for (let i = 0; i < words.length; i++) {
    if ((line + words[i]).length > firstLineLength && breakCount < 1) {
      result.push(
        <>
          {line.trim()}
          <br />
        </>,
      );
      line = "";
      breakCount++;
    } else if (breakCount >= 1 && (line + words[i]).length > secondLineLength) {
      line = line.trim() + "...";
      break;
    }
    line += words[i] + " ";
  }

  if (breakCount === 0 || line.trim().length > 0) {
    result.push(<>{line.trim()}</>);
  }

  return result;
}
