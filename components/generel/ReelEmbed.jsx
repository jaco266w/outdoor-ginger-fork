"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ReelEmbed = ({ Youtube_Short_URL }) => {
  const videoId = Youtube_Short_URL.split("/").pop();
  return (
    <div
      className="z-70 grid grid-cols-1 grid-rows-1 place-items-center absolute -top-[344px] routline"
      style={{ transform: "scale(0.9)" }}
    >
      <Image
        src="/onePhone.png"
        alt="Phone"
        width={300}
        height={600}
        className="col-start-1 row-start-1 w-72 z-70 pointer-events-none"
      />
      <div
        className="col-start-1 row-start-1 rounded-[40px] w-[200px]"
        style={{
          transform: "translateY(-8px)",
        }}
      >
        <div className="bg-[#000] h-5 rounded-[60px]" />
        <iframe
          width="478"
          height="849"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Imagination #imagination #fantasy #wilderness #thinkbig #colorgrading"
          allowFullScreen
          className="w-full h-full aspect-[9/16] focus:outline-none z-70"
        ></iframe>
        <div className="bg-[#000] h-7 -mt-1 rounded-3xl" />
      </div>
    </div>
  );
};

export default ReelEmbed;
