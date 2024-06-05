import NewsletterBanner from "@/components/generel/NewsletterBanner";
import SupportBanner from "@/components/generel/SupportBanner";
import LatestYT from "@/components/generel/LatestYT";
import Hero from "@/components/generel/Hero";
import SponsorBanner from "@/components/generel/SponsorBanner";
import AboutBlock from "@/components/generel/AboutBlock";
import JoinTheClub from "@/components/generel/JoinTheClub";
import SocialFollowers from "@/components/generel/SocialFollowers";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AnimatedCount from "@/components/generel/AnimatedCount";
import Link from "next/link";
import { IconBrandInstagram } from "@tabler/icons-react";

export default function Home() {
  return (
    <main>
      <Hero
        title="Outdoor Ginger"
        bg="bg-forsideMobil md:bg-forside"
        bgPos="bg-bottom md:bg-center"
        height="h-[36rem] md:h-[80vh]"
      >
        <div id="left" className="flex flex-col w-full gap-4 mt-4 text-lg">
          <p className="text-ogBG-base max-w-[90%] opacity-80 leading-normal text-base md:text-lg ">
            The home of adventurers, explorers, and wilderness enthusiasts
          </p>
          <Link href="/membership">
            <Button size="md" variant="primary" className="">
              Join our next adventure!
            </Button>
          </Link>
        </div>

        <div
          id="right"
          className="w-full mb-8 md:mb-0 flex flex-col gap-6 md:gap-16 px-8  md:px-12 items-end md:items-start"
        >
          <div className="flex gap-2 items-center  bg-neutral-100/75 px-2 py-2 rounded-full w-max">
            <Link href="https://www.instagram.com/outdoorgingerchannel/">
              <Image
                src="/profile.webp"
                alt="August Vallant"
                width={500}
                height={500}
                className="rounded-full aspect-square w-8 h-8 md:w-11 md:h-11"
              />
            </Link>
            <div className="pr-2 md:pr-4 ">
              <p className="text-sm md:text-base font-medium text-ogPrimary ">
                August Vallat
              </p>
              <p className="text-xs font-normal text-ogLabel-base opacity-80">
                Adventure Influencer
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center  bg-neutral-100/75 px-3 py-2 rounded-full w-fit place-self-end">
            <Link href="https://www.instagram.com/outdoorgingerchannel/">
              <IconBrandInstagram
                className="w-8 h-8 md:w-10 md:h-10 text-ogPrimary"
                stroke="1.75px"
              />
            </Link>
            <div className="">
              <AnimatedCount
                finalCount={333000}
                duration={3}
                className="text-sm md:text-base p-0 font-medium"
              />
              <p className="text-xs font-normal text-ogLabel-base opacity-80">
                Followers
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="space-y-24">
        <div>
          <AboutBlock />
        </div>
        <div>
          <LatestYT />
        </div>
        <div>
          <JoinTheClub />
        </div>
        <div>
          <SocialFollowers />
          <SponsorBanner />
          <SupportBanner type="original" />
          <NewsletterBanner
            title="Campfire Chronicles"
            subtitle="The Outdoor Ginger Blog"
          />
        </div>
      </div>
    </main>
  );
}
