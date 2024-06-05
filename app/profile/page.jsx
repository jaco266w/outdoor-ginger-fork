import { Button } from "@/components/ui/button";
import { logout } from "@/lib/supabase/actions";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { client, urlFor } from "@/lib/sanity/client";
import { IconDisc, IconCalendar, IconGift, IconArticle, IconTree, IconShoppingBagDiscount } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const { createClient } = require("@/lib/supabase/server");
const { redirect } = require("next/navigation");

const previousEventsQuery = `*[_type == "previousEvents"]{
  title,
  date,
  time,
  location,
  content,
  howToParticipate,
  images,

}`;

const previousEvents = await client.fetch(previousEventsQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});
const upcomingEventsQuery = `*[_type == "upcomingEvents"]{
  title,
  date,
  time,
  location,
  content,
  howToParticipate,
  images,

}`;
const upcomingEvents = await client.fetch(upcomingEventsQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});
export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="">
      <div className="w-full bg-yourmembership bg-top bg-cover py-24 md:py-28 lg:py-32 xl:py-36 pt-32 md:pt-40 lg:pt-56 xl:pt-64 z-20 relative">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-tr from-black/50 to-transparent z-30"></div>
        <div className="relative z-40  px-8">
          <div className="max-w-7xl mx-auto grid items-center gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px] ">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm text-white">Your Membership</div>
              <h1 className="text-3xl font-bold text-ogBG-base sm:text-5xl xl:text-6xl">Explore the Great Outdoors with August</h1>
              <p className="max-w-[600px] text-ogBG-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">As an Outdoor Ginger member, you&#39;ll enjoy access to exclusive field trips, discounts, and more.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ogLabel-muted">Membership Status</p>
                    <p className="text-2xl font-semibold text-ogLabel-base">Adventurer</p>
                  </div>
                  <Badge variant="primary" className="bg-ogSuccess-light text-ogBG-base border-none">
                    Active
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-ogLabel-muted">Membership Expires</p>
                  <p className="text-2xl font-bold text-ogLabel-base">June 30, 2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-ogLabel-muted">Unlocked Perks</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Shop Discounts</Badge>
                    <Badge variant="secondary">Exclusive Expeditions</Badge>
                    <Badge variant="secondary">Access all Articles</Badge>
                  </div>
                </div>
                {/* <form action={logout}>
                  <Button type="submit">Log out</Button>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className=" w-screen rounded-t-[3rem] -mt-[3rem] z-50 relative bg-ogBG-base px-8">
        <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 ">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]">
            <div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents &&
                    upcomingEvents
                      .filter((item) => new Date(item.date) > new Date())
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((item, index) => (
                        <div className="flex items-center gap-4" key={index}>
                          <Image
                            alt="Expedition"
                            className="rounded-lg object-cover"
                            height={80}
                            src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"}
                            style={{
                              aspectRatio: "80/80",
                              objectFit: "cover",
                            }}
                            width={80}
                          />
                          <div>
                            <p className="font-medium text-ogLabel-base">{item.title}</p>
                            <p className="text-sm text-ogLabel-muted">{item.date}</p>
                            <p>Location: {item.location}</p>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Unlocked Perks</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                    <IconShoppingBagDiscount className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-ogLabel-base">Shop discounts</p>
                    <p className="text-sm text-ogLabel-muted">Save 25% on all Outdoor Ginger shop items.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                    <IconTree className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-ogLabel-base">Exclusive Expeditions</p>
                    <p className="text-sm text-ogLabel-muted">Join August&#39;s outdoor adventures.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                    <IconArticle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-ogLabel-base">Access all Articles</p>
                    <p className="text-sm text-ogLabel-muted">Access all articles and more.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>
              <div className="space-y-4">
                {previousEvents &&
                  previousEvents
                    .filter((item) => new Date(item.date) < new Date())
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, index) => (
                      <div className="flex items-center gap-4" key={index}>
                        <Image
                          alt="Expedition"
                          className="rounded-lg object-cover"
                          height={80}
                          src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"}
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div>
                          <p className="font-medium text-ogLabel-base">{item.title}</p>
                          <p className="text-sm text-ogLabel-muted">{item.date}</p>
                          <p>Location: {item.location}</p>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="mt-24 rounded-lg bg-ogPrimary p-6 text-ogBG-base shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">Sign Up for Future Expeditions</h2>
                <p className="text-ogBG-base opacity-80 mt-2">Be the first to know about our upcoming outdoor adventures and exclusive member-only events.</p>
              </div>
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1 bg-ogPrimary placeholder:text-ogPrimary-lightest text-ogPrimary-lightest border-ogPrimary-lighter focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter your email" type="email" />
                <Button type="submit" variant="primary" className="bg-ogPrimary-dark hover:bg-ogPrimary-darker">
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
