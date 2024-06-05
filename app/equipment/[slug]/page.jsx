import ProductInteraction from "@/components/equipment/ProductInteraction";
import Hero from "@/components/generel/Hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { forkClient } from "@/lib/sanity/client";
import { PortableText } from "next-sanity";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductImageGallery from "@/components/equipment/ProductImageGallery";

export async function generateStaticParams() {
  const slugQuery = '*["_type" == "product"]{slug}';

  const products = await forkClient.fetch(slugQuery, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
    },
  });

  return products.map((product) => ({
    params: { slug: product.slug.current },
  }));
}

export default async function Page({ params }) {
  const productQuery =
    '*[_type == "product" && slug.current == $slug]{title, slug, description, body, price, memberPrice, images, tags, category, _id, materials, weight, isAffiliate, affiliateLink}';

  const productFetch = await forkClient.fetch(productQuery, {
    slug: params.slug,
  });
  const product = productFetch[0];

  return (
    <main className="min-h-screen">
      <Hero height="h-48 md:h-[30vh]" bg="bg-equipment" />
      <nav className="container max-w-5xl mx-auto mb-12">
        <div className="md:px-8">
          <Breadcrumb>
            <BreadcrumbList className="text-ogLabel-faint">
              <BreadcrumbItem>
                <BreadcrumbLink href="/equipment">Equipment</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-ogLabel-faint">
                  {product.title.length > 30
                    ? product.title.substring(0, 30) + "..."
                    : product.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
      <section className="container mx-auto max-w-5xl md:grid grid-cols-2 prose prose-neutral pb-24">
        <div className="md:px-8 pb-8">
          <ProductImageGallery imgs={product.images} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="mb-0 font-bold">{product.title}</h1>
          <ProductInteraction product={product} />
          <PortableText value={product.body} />
          <Accordion type="multiple" collapsible="true" className="w-full my-4">
            {product.materials && (
              <AccordionItem value="item-1" defaultOpen={true} className="">
                <AccordionTrigger className="text-base py-0">
                  Materials
                </AccordionTrigger>
                <AccordionContent className="text-ogLabel-muted text-sm">
                  <div className="prose prose-neutral prose-sm prose-strong:font-medium prose-p:text-sm">
                    <PortableText value={product.materials} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
            {product.weight && (
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base py-0">
                  Weight
                </AccordionTrigger>
                <AccordionContent className="text-ogLabel-muted text-sm">
                  {product.weight}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
