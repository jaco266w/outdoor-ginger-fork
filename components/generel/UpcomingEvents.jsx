import { client, urlFor } from "@/lib/sanity/client";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

export default function Page() {
  return (
    <section className="py-20 bg-ogPrimary-lightest rounded-t-[3rem] ">
      <div className="max-w-7xl mx-auto px-6 md:px-0 ">
        <div className="">
          <div>
            <h2 className="font-bold text-3xl md:text-7xl uppercase text-ogPrimary font-display">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {upcomingEvents &&
                upcomingEvents.map((item, index) => (
                  <Card className=" bg-ogBG-base rounded-xl shadow w-full max-w-sm md:h-fit overflow-auto flex flex-col md:justify-between" key={index}>
                    <div className="overflow-hidden">
                      <Image key={index} src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"} alt="" width={500} height={500} className="object-cover md:w-fit hover:scale-[102%] transition-all duration-500" />
                    </div>
                    <CardContent className="p-6 flex flex-col gap-4 h-36 md:h-44">
                      <div className="flex flex-col gap-2 justify-center">
                        <CardTitle className="text-xl font-medium w-64">{item.title}</CardTitle>

                        <div className="text-sm flex flex-col justify-center">
                          <p>When: {item.date}</p>
                          <p>Time: {item.time}</p>
                          <p>Location: {item.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-center p-6">
                      <Button variant="primary" className="bg-ogPrimary ">
                        <Link href="/login">
                          <p className="text-ogPrimary-lightest">Log in to see more</p>
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { client, urlFor } from "@/lib/sanity/client";
// import { PortableText } from "next-sanity";
// import Image from "next/image";
// import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useState } from "react";

// const upcomingEventsQuery = `*[_type == "upcomingEvents"]{
//     title,
//     date,
//     time,
//     location,
//     content,
//     howToParticipate,
//     images,
//   }`;

// export async function getStaticProps() {
//   const upcomingEvents = await client.fetch(upcomingEventsQuery);
//   return {
//     props: {
//       upcomingEvents,
//     },
//     revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
//   };
// }

// export default function Page({ upcomingEvents }) {
//   const [expandedCard, setExpandedCard] = useState(null);

//   return (
//     <section className="py-12 bg-ogPrimary-lightest rounded-t-[3rem] rounded-b-[3rem]">
//       <div className="max-w-7xl mx-auto px-6 md:px-0 ">
//         <div className="">
//           <div>
//             <h2 className="font-bold text-4xl uppercase text-ogPrimary font-display">Upcoming Events</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//               {upcomingEvents &&
//                 upcomingEvents.map((item, index) => (
//                   <div className="relative" key={index}>
//                     <Card className={`bg-ogBG-base rounded-xl shadow w-full max-w-sm overflow-auto ${expandedCard === index ? "h-[200px]" : "h-[500px]"}`}>
//                       <div className="overflow-hidden">
//                         <Image key={index} src={item.images ? urlFor(item.images).url() || "/bananaAugust.png" : "/bananaAugust.png"} alt="" width={500} height={500} className="object-cover h-fit w-full hover:scale-[102%] transition-all duration-500" />
//                       </div>
//                       <CardContent className="p-6 flex flex-col gap-4">
//                         <div className="flex flex-col gap-2">
//                           <CardTitle className="text-xl font-medium">{item.title}</CardTitle>
//                           <PortableText value={item.content} />
//                           <CardDescription className="text-sm"></CardDescription>
//                         </div>
//                         <Button variant="primary" className>
//                           <Link href="/login">
//                             <p>Log in to see more</p>
//                           </Link>
//                         </Button>
//                       </CardContent>
//                     </Card>
//                     <Button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-100 hover:opacity-100 transition-opacity duration-500" onClick={() => setExpandedCard(index)}>
//                       <p className="text-white text-2xl">Read More</p>
//                     </Button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
