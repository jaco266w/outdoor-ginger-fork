import { client, urlFor } from "@/lib/sanity/client";
import Hero from "@/components/generel/Hero";
import Image from "next/image";
import OrangeBanner from "@/components/generel/OrangeBanner";
import SponsorBanner from "@/components/generel/SponsorBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ConnectBanner from "@/components/ConnectBanner";

import { PortableText } from "next-sanity";

const testimonialsQuery = '*[_type == "testimonials"]{Sponsor_Name, content}';

const testimonials = await client.fetch(testimonialsQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});
console.log(testimonials);
export default function AboutMe() {
  return (
    <main className="">
      <Hero
        title="About August"
        imageSrc="/abouthero.webp"
        bg="bg-about"
        bgPos="bg-bottom"
        height="h-[90vh] md:h-[100vh]"
      >
        <div id="left" className="md:mt-2 w-full mb-8">
          <p className="text-ogLabel-faint font-light md:text-2xl italic w-max font-display opacity-80">
            &quot;Anything is possible if you dare to be curious&quot;
          </p>
        </div>
      </Hero>

      <section className="px-8 pb-10 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className=" flex flex-col mb-10 md:mb-0">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 uppercase">
              Who is August?
            </h2>
            <div className="md:text-lg max-w-xl w-full space-y-4">
              <p>
                August, known as Outdoor Ginger, embarked on his journey with
                the wind in his hair and the thrill of adventure in his heart.
              </p>
              <p>
                From a young age, he embraced the call of the wild, navigating
                the trails and conquering the great outdoors.
              </p>
              <p>
                With each expedition, he honed his skills and forged a path of
                his own, earning accolades and admiration along the way.
              </p>
              <p>
                Now, as a seasoned explorer, August stands ready to inspire and
                ignite the spirit of adventure in all who dare to follow.
              </p>
            </div>
          </div>

          <Image
            src="/profile.webp"
            alt=""
            width={800}
            height={800}
            className="rounded-full w-full h-full  max-w-xs md:max-w-md"
          />
        </div>
      </section>
      <OrangeBanner h2="Beyond boundaries">
        <div className="flex flex-col items-center">
          <p className="text-ogBG-base font-normal leading-5 text-sm md:text-3xl text-center max-w-xl mt-4 ">
            August&apos;s journey is about lessons learned, self-reliance, and
            resilience, embracing the unknown.
          </p>
        </div>
      </OrangeBanner>
      <div className="relative -top-36 md:-top-60">
        <div className="flex justify-center">
          <Image
            src="/waterSitting.png"
            alt="August is sitting by the water"
            width={1000}
            height={1000}
            className="w-80 md:w-1/3 rounded-full shadow-xl"
          />
        </div>
      </div>
      <div className="px-8 md:pb-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className="flex flex-col pb-4">
            <h2 className="font-display text-3xl md:text-5xl mb-8 leading-7 uppercase font-bold">
              Membership
            </h2>
            <div>
              <p className="mb-6 md:text-lg max-w-xl">
                My community of 100+ members is growing and I&apos;m always
                looking for new members to join. If you&apos;re interested, sign
                up below.
              </p>
              <Link href="/membership">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-ogPrimary text-base hover:bg-ogPrimary-dark gap-1 px-10"
                >
                  Sign up now
                </Button>
              </Link>
            </div>
          </div>

          <Image
            src="/freedomAugust.jpeg"
            alt=""
            width={1000}
            height={1000}
            className="py-10 md:py-0 max-w-xs md:max-w-md rounded-full"
          />
        </div>
      </div>

      <SponsorBanner type="static" />
      <section className="px-8 my-20 md:py-28 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl uppercase font-bold mb-6 mx-auto">
          Testimonials
        </h2>
        <h3 className="text-2xl mb-6 md:mb-10 ">What my partners say</h3>
        {testimonials.map((testimonial, index) => (
          <div
            className="prose md:prose-lg prose-h3:italic prose-p:italic prose-p:text-ogLabel-muted w-auto  prose-p:text-sm prose-p:md:text-lg  prose-h3:text-sm prose-h3:md:text-xl my-4"
            key={index}
          >
            <PortableText value={testimonial.content} />

            <h3>{testimonial.Sponsor_Name}</h3>
            <div className="bg-ogLabel-link h-0.5 w-28 mb-4"></div>
          </div>
        ))}
      </section>

      <article className="px-8 flex justify-end -mt-28 md:-mt-40">
        <Image
          src="/computerAbout.png"
          alt="Laptop"
          width={2000}
          height={2000}
          className="hidden md:block object-contain w-96 md:w-[40vw] -mb-32 2xl:mr-28 md:-mb-[500px] z-10 drop-shadow-lg"
        />
        <Image
          src="/threePhones.png"
          alt=""
          width={1400}
          height={1400}
          className="lg:hidden object-contain w-64 md:w-[700px] -mb-20 md:-mb-44 z-10 drop-shadow-lg"
        />
      </article>

      <ConnectBanner />
    </main>
  );
}
