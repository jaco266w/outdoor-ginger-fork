import { Button } from "@/components/ui/button";
import { logout } from "@/lib/supabase/actions";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { client, urlFor } from "@/lib/sanity/client";
import { IconDisc, IconCalendar, IconGift, IconArticle, IconTree, IconShoppingBagDiscount, IconOutlet, IconCash, IconWarranty } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { date } from "zod";
import MemberBanner from "@/components/generel/MemberBanner";
import SponsorBanner from "@/components/generel/SponsorBanner";
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

const getRecommendations = () => {
  const recommendations = [
    { title: "Forest Survival Kit", description: "A comprehensive survival kit for forest adventures.", image: "/interview.png" },
    { title: "Tactical Jacket", description: "Experience unmatched durability with our Tactical Jacket, perfect for the modern adventurer.", image: "/gearup.png" },
    { title: "Exclusive Member Meetup - Hike and Camp", description: "Explore the outdoor and camp with fellow members", image: "/northsouth.png" },
    { title: "Multifunctional Pro Kit", description: "Don't forget this multifunctional kit for professional adventurers for your next outdoor trip.", image: "/health.png" },
  ];

  return recommendations;
};

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const user = {
    firstname: "Anders",
    lastname: "flexbox",
    email: "anders@gmail.com",
    birthday: "March 2, 1900",
    activities: ["Mountaineering", "Hiking", "Outdoor", "Skiing"],
    nonSelectedActivities: [
      "Camping",
      "Bird watching",
      "Mountain Biking",
      "Kayaking",
      "Fishing",
      "Orienteering",
      "Trail running",
      "Wildlife photography",
      "Scuba diving",
      "Sailing",
      "Stargazing",
      "Photography",
      "Geocaching",
      "Snowboarding",
      "Paddleboarding",
      "Surfing",
      "Rock climbing",
      "Gardening",
    ],
    membershipLevel: "Adventurer",
    membershipActive: true,
    points: 0,
    benefits: {
      cashPoints: "25%",
      warranty: "7 years",
      onlineOutlet: "Activated",
    },
    membershipLevels: [
      {
        level: "Adventurer",
        unlocked: true,
        benefits: ["Unlock all beginner trails", "25% off on epic outdoor gear", "Exclusive content & tips from Outdoor Ginger"],
        price: 0,
      },
      {
        level: "Explorer",
        unlocked: false,
        benefits: ["Conquer intermediate trails", "Invites to members-only events", "Comprehensive tutorials"],
        price: 50,
      },
      {
        level: "Trailblazer",
        unlocked: false,
        benefits: ["Master advanced trails", "VIP access to premium camping spots", "First dibs on new gear", "Early access to new content"],
        price: 100,
      },
      {
        level: "Pioneer",
        unlocked: false,
        benefits: ["All-access pass to every trail", "Exclusive, serene camping locations", "In-depth articles", "Exclusive interviews with outdoor experts"],
        price: 200,
      },
    ],
  };
  const getNextLevels = (currentLevel, levels) => {
    const currentIndex = levels.findIndex((level) => level.level === currentLevel);
    return levels.slice(currentIndex + 1);
  };
  const exclusivePosts = [
    {
      id: 1,
      title: "Interview with an Expert: Tips for Thriving in the Wilderness",
      date: "August 1st, 2024",
      description: "Join us as we sit down with a wilderness survival expert who shares valuable tips and insights on how to thrive in the wild. Learn from the best and enhance your outdoor skills.",
      image: "/interview.png",
    },
    {
      id: 2,
      title: "5 Must-Have Gadgets for Your Next Outdoor Adventure",
      date: "August 5th, 2024",
      description: "Stay ahead of the game with these must-have gadgets for outdoor adventures. From GPS devices to portable chargers, we cover the tech that can make your trips safer and more enjoyable.",
      image: "/gearup.png",
    },
    {
      id: 3,
      title: "Navigating the Wild: How to Use a Map and Compass",
      date: "August 12th, 2024",
      description: "Master the basics of navigation with our guide on how to use a map and compass. This essential skill will help you stay on course and explore with confidence.",
      image: "/northsouth.png",
    },
    {
      id: 4,
      title: "The Benefits of Outdoor Adventure for Mental Health",
      date: "August 20th, 2024",
      description: "Explore the mental health benefits of spending time in nature. Learn how outdoor adventures can reduce stress, improve mood, and enhance overall well-being.",
      image: "/health.png",
    },
  ];
  const recommendations = getRecommendations();
  const postQuery = '*[_type == "post"]{title, slug, author, publishedAt, mainImage, content, Latitude, Longitude}';

  const posts = await client.fetch(postQuery, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
    },
  });

  return (
    <main className="">
      <div className="w-full bg-yourmembership bg-top bg-cover py-24 md:py-28 lg:py-32 xl:py-36 pt-32 md:pt-40 lg:pt-56 xl:pt-64 z-20 relative">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-tr from-black/50 to-transparent z-30"></div>
        <div className="relative z-40  px-8">
          <div className="max-w-7xl  mx-auto grid items-center gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="space-y-2 ">
              <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm text-white">Your Membership</div>
              <h1 className="text-4xl font-bold text-ogBG-base sm:text-5xl xl:text-6xl ">
                Welcome <br /> <span>{user.firstname}</span>
              </h1>
              <p className="max-w-[550px] text-ogBG-base md:text-lg lg:text-sm xl:text-base"> As a Outdoor Ginger member, you have access to exclusive field trips, special offers, and latest updates. Dive in and explore all the benefits that come with your membership.</p>
            </div>
            <div className="rounded-lg bg-ogBG-base p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="">
                      <p className="text-sm font-medium text-ogLabel-muted">Membership Status</p>
                      <p className="text-2xl font-semibold text-ogLabel-base">{user.membershipLevel}</p>
                    </div>

                    <Badge variant="primary" className={`px-2 py-1 rounded-xl text-white border-none ${user.membershipActive ? "bg-ogSuccess" : "bg-ogDestructive"}`}>
                      {user.membershipActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                          <IconShoppingBagDiscount className="h-6 md:h-10 w-10" />
                        </div>
                        <div>
                          <p className="font-medium text-ogLabel-base">Shop discounts</p>
                          <p className="text-sm text-ogLabel-muted">Save 25% on all Outdoor Ginger shop items.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                          <IconTree className="h-6 md:h-10 w-6 md:w-10" />
                        </div>
                        <div>
                          <p className="font-medium text-ogLabel-base">Access to basic trails</p>
                          <p className="text-sm text-ogLabel-muted">Join August&#39;s outdoor adventures.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-ogSuccess text-ogBG-base">
                          <IconArticle className="h-6 md:h-10 w-6 md:w-10" />
                        </div>
                        <div>
                          <p className="font-medium text-ogLabel-base">Exclusive Blog Posts</p>
                          <p className="text-sm text-ogLabel-muted">Access all articles and more.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className=" w-screen rounded-t-[3rem] -mt-[3rem] z-50 relative bg-ogBG-base px-8">
        <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 ">
          <div className="grid grid-cols-1 gap-4 sm:gap-8 mt-8"></div>
          <div className="flex flex-col sm:flex-row justify-between space-y-6">
            <section>
              <div className="">
                <div className="mb-8 space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Next Event</h2>
                  <p className="text-sm sm:text-base">
                    I have a fantastic lineup of events for members! <br /> Join me for these exciting activities:
                  </p>
                </div>

                <div className="space-y-4">
                  {upcomingEvents &&
                    upcomingEvents
                      .filter((item) => new Date(item.date) > new Date())
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .slice(0, 1)
                      .map((item, index) => (
                        <div className="flex flex-col sm:flex-row items-center gap-4" key={index}>
                          <Image
                            alt="Expedition"
                            className="rounded-lg object-cover "
                            height={300}
                            src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"}
                            style={{
                              aspectRatio: "80/80",
                              objectFit: "cover",
                            }}
                            width={300}
                          />
                          <div className="space-y-4">
                            <p className="font-medium md:text-2xl text-ogLabel-base">{item.title}</p>
                            <p className="text-sm text-ogLabel-muted">{item.date}</p>
                            <p>Location: {item.location}</p>
                            <div style={{ maxWidth: "400px" }}>
                              <p className="text-xs sm:text-sm">
                                Are you ready to elevate your survival skills to the next level? Join our exciting Wilderness Survival Workshop, where you will learn essential techniques for surviving in the wild—all from the comfort of your own home!
                              </p>
                            </div>
                            <Button variant="primary" color="primary">
                              Sign up
                            </Button>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </section>
            <div className="">
              <div className="mb-4 sm:mb-8 space-y-4 sm:space-y-6">
                <h2 className="text-xl md:text-3xl font-semibold">Upcoming Events</h2>
                <p className="text-sm sm:text-base">
                  I have a fantastic lineup of events for members! <br /> Join me for these exciting activities:
                </p>
              </div>

              <div className="space-y-4">
                {upcomingEvents &&
                  upcomingEvents
                    .filter((item) => new Date(item.date) > new Date())
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(1)
                    .map((item, index) => (
                      <div className="flex items-center gap-4" key={index}>
                        <Image
                          alt="Expedition"
                          className="rounded-lg object-cover hover:scale-[102%] transition-all duration-500"
                          height={80}
                          src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"}
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div className="">
                          <p className="font-medium text-ogLabel-base">{item.title}</p>
                          <p className="text-sm text-ogLabel-muted">{item.date}</p>
                          <p>Location: {item.location}</p>
                          <Button variant="primary" color="primary" className="mt-2 text-xs p-2 h-6">
                            Sign up
                          </Button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <section className="previous max-w-7xl mx-auto px-8 md:px-0">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Previous Events</h2>
            <div className="space-y-4">
              {previousEvents &&
                previousEvents
                  .filter((item) => new Date(item.date) < new Date())
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, index) => (
                    <div className="flex items-center gap-4 opacity-50" key={index}>
                      <div className="flex flex-row space-x-4 text-sm">
                        <p className="font-medium text-ogLabel-base">{item.title}</p>
                        <p className="text-sm text-ogLabel-muted">{item.date}</p>
                        <p>Location: {item.location}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </section>

      <section className="max-w-7xl mx-auto py-12 md:py-16 px-8 md:px-0">
        <div className="space-y-6 mb-8">
          <h2 className="text-3xl md:text-5xl font-semibold">Exclusive Blog Posts</h2>
          <p className="text-balance">Stay ahead with our exclusive blog content! As a valued member, you get access to insightful articles, expert advice, and in-depth analyses you won’t find anywhere else.</p>
        </div>

        <div className="flex flex-col gap-6 bg-ogBG-base ">
          <div className="col-span-1 flex flex-col gap-6 -mt-6 md:mt-0">
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exclusivePosts &&
                  exclusivePosts.map((post, index) => (
                    <div className="md:w-96 overflow-hidden border rounded-xl gap-2 pb-4" key={index}>
                      <div className="">
                        <Image
                          width={400}
                          height={400}
                          src={post.image}
                          alt="Blog Image"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          className="w-full object-cover hover:scale-[102%] transition-all duration-500"
                        />
                      </div>
                      <div className="flex flex-col p-4">
                        <p className="font-medium text-ogLabel-base">{post.title}</p>

                        <p className="mt-2 text-sm text-ogLabel-muted">{post.description.substring(0, 75)}...</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-12 lg:py-20 xl:py-24 px-8 md:px-0">
        <div>
          <div className="rounded-lg bg-ogPrimary p-10 text-ogBG-base shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Book private session</h2>
                <p className="text-ogBG-base opacity-80 mt-2">Book a private session today and enjoy personalized experiences tailored just for you.</p>
              </div>
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1 bg-ogPrimary placeholder:text-ogPrimary-lightest text-ogPrimary-lightest border-ogPrimary-lighter focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter your email" type="email" />
                <Button type="submit" variant="primary" className="bg-ogPrimary-dark hover:bg-ogPrimary-darker">
                  Book now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-8 md:px-0">
        <div className=" py-24 md:py-32  z-50  ">
          <section>
            <h2 className="text-3xl md:text-5xl font-semibold mb-4">Account Info</h2>
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-col md:flex-row justify-between space-x-4">
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-10 border p-8 border-ogPrimary rounded-lg">
                  <div className="space-y-4 place-items-start ">
                    <h3 className="font-medium text-xl">Contact Info</h3>
                    <p>Name: {user.firstname}</p>
                    <p>Email: {user.email}</p>
                    <p>Birthday: {user.birthday}</p>

                    <div className="md:w-96">
                      <h3 className="font-medium mb-2">Your Interests</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {user.activities.map((activity) => (
                          <Badge key={activity} variant="primary" className="bg-ogPrimary text-white border-none">
                            {activity}
                          </Badge>
                        ))}
                        {user.nonSelectedActivities.map((activity) => (
                          <Badge key={activity} variant="secondary" className="bg-gray-200 text-gray-600 border-none">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <div className="flex">
                      <div className="space-y-2">
                        <h3 className="font-medium mb-2">Membership Status</h3>
                        {user.membershipLevels.map((level, index) => (
                          <div key={index} className={`${level.level !== user.membershipLevel ? "opacity-50 mb-4" : ""}`}>
                            <h4>
                              {level.level}
                              {level.level === user.membershipLevel && (
                                <Badge variant="primary" className="ml-2 bg-ogSuccess text-white border-none">
                                  Current Level
                                </Badge>
                              )}
                            </h4>
                            <ul className="list-inside pl-5">
                              {level.benefits.map((benefit, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border p-8 border-ogPrimary rounded-lg">
                <div className="space-y-4 place-items-start ">
                  <h3 className="font-medium text-xl">Payment Info</h3>
                  <p>Card Number: **** **** **** **** </p>
                  <p>Expiry Date: 06/25</p>
                  <Button variant="primary" className="mt-2">
                    Edit Payment Info
                  </Button>
                </div>
                <div className="mt-6">
                  <div className="flex">
                    <div className="space-y-2">
                      <h3 className="font-medium mb-2">Membership expires</h3>
                      <p>June 30, 2024 </p>
                      <Button variant="primary" className="mt-2">
                        Renew Membership
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="mt-4">
              Edit info
            </Button>
          </section>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 xl:py-24 px-8 md:px-0">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold">Recommendations</h2>
          <p className="text-balance">Outdoor Ginger think you&apos;ll love these:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <Link href="/equipment" key={index}>
                <div className="md:w-96 overflow-hidden border rounded-xl gap-2 pb-4">
                  <div>
                    <Image width={400} height={400} src={rec.image} alt={rec.title} style={{ aspectRatio: "80/80", objectFit: "cover" }} className="w-full object-cover hover:scale-[102%] transition-all duration-500" />
                  </div>
                  <div className="flex flex-col p-4">
                    <p className="font-medium text-ogLabel-base">{rec.title}</p>
                    <p className="mt-2 text-sm text-ogLabel-muted">{rec.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MemberBanner title="25% Discount for members" description="Get access to exclusive content, discounts and more!" />
      <SponsorBanner />
    </main>
  );
}
