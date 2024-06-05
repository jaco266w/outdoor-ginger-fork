"use client";

import ImageGallery from "react-image-gallery";
import { forkUrlFor } from "@/lib/sanity/client";
import "./ProductImageGallery.css";

export default function ProductImageGallery({ imgs }) {
  console.log(imgs);
  const images = imgs.map((img) => ({
    original: forkUrlFor(img).url(),
    thumbnail: forkUrlFor(img).width(250).url(),
  }));
  return <ImageGallery items={images} showPlayButton={false} showNav={false} />;
}
