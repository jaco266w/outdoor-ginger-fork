import Hero from "@/components/generel/Hero";
import { forkClient } from "@/lib/sanity/client";
import ProductCard from "@/components/equipment/ProductCard";
import SponsorBanner from "@/components/generel/SponsorBanner";
import MemberBanner from "@/components/generel/MemberBanner";

const productQuery =
  '*[_type == "product"]{title, slug, description, mainContent, price, memberPrice, images, tags, category, _id}';

const products = await forkClient.fetch(productQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});

const categoryQuery = '*[_type == "category"]{title, slug, description, _id}';

const categories = await forkClient.fetch(categoryQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});

const productsByCategory = products.reduce((acc, product) => {
  const categoryId = product.category._ref;
  if (!acc[categoryId]) {
    acc[categoryId] = [];
  }
  acc[categoryId].push(product);
  return acc;
}, {});

const categoriesWithProducts = categories.map((category) => ({
  ...category,
  products: productsByCategory[category._id] || [],
}));

export default function Page() {
  return (
    <main>
      <Hero
        title="Equipment"
        imageSrc="/equipmenthero.webp"
        height="h-96 md:h-[40vh]"
        bg="bg-equipment"
        bgPos="bg-top"
        padding="pb-20 md:pb-24"
      >
        <div id="left" className="w-[200%] md:w-full">
          <p className="text-xl md:text-2xl font-medium opacity-70 font-display text-ogBG-base">
            Reliable gear for outdoor adventures
          </p>
        </div>
      </Hero>
      <section className="px-8">
        <div className="min-h-screen max-w-7xl mx-auto pb-24">
          <div className="flex flex-wrap justify-center xl:justify-between gap-12 -mt-6 md:mt-0">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </section>
      <MemberBanner
        title="25% Discount for members"
        description="Get access to exclusive content, discounts and more!"
      />
      <SponsorBanner />
    </main>
  );
}
