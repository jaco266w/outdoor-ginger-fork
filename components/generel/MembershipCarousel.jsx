import { client, urlFor } from "@/lib/sanity/client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PortableText } from "next-sanity";

const whatPeopleSayQuery = '*[_type == "whatPeopleSay"]{Sponsor_Name, content}';

const whatPeopleSay = await client.fetch(whatPeopleSayQuery, {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
  },
});

export default function MemberCarousel() {
  return (
    <div className="my-10 py-10 md:my-32 ">
      <div className="flex flex-col items-center justify-center px-6 md:px-0 ">
        <h1 className="text-center text-4xl md:text-5xl  font-bold mb-2 md:mb-10 uppercase">
          Member <br /> testimonials
        </h1>
        <div className="w-full flex flex-col  max-w-full md:max-w-xl">
          <Carousel>
            <CarouselContent>
              {whatPeopleSay.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-ogBG-base drop-shadow-sm">
                      <CardContent className="flex aspect-auto items-center justify-center p-6 h-96">
                        <div className="flex flex-col">
                          <div className="text-sm md:text-xl pb-6 italic">
                            <PortableText value={item.content} />
                          </div>
                          <div className="bg-ogLabel-link h-0.5 w-28 mb-4"></div>
                          <h3 className="text-base md:text-xl">
                            {item.Sponsor_Name}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="text-4xl flex justify-center gap-4 w-full md:w-auto mt-8 md:mt-0 ">
              <CarouselPrevious className=" static md:absolute bg-ogPrimary text-ogBG-base border-none hover:bg-ogPrimary-dark hover:text-ogBG-base" />
              <CarouselNext className="static md:absolute bg-ogPrimary text-ogBG-base hover:bg-ogPrimary-dark hover:text-ogBG-base border-none " />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
