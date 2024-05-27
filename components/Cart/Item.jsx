"use client";

import { IconPlus, IconMinus, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/client";

export default function Item({
  imgSrc,
  name,
  price,
  quantity,
  onAdd,
  onRemove,
  onRemoveAll,
}) {
  const imageUrl = urlFor(imgSrc).url();
  return (
    <div className="mb-2">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Image
            src={imageUrl}
            width={64}
            height={64}
            alt={name}
            className="object-cover rounded-md aspect-square w-16 h-16"
          />

          <div className="flex flex-col justify-evenly">
            <p className="text-ogLabel font-normal text-ogLabel-base whitespace-nowrap text-ellipsis overflow-hidden max-w-[26ch] md:max-w-[20ch]">
              {name}
            </p>
            <p className="font-normal text-ogLabel-muted">{price}€</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="row-start-2 col-start-2 flex gap-4 items-center">
            <Button
              variant="outline"
              size="icon"
              className="border p-1 w-8 h-8 rounded-md hover:bg-neutral-300 transition duration-200 hover:border-neutral-300"
              onClick={onRemove}
            >
              <IconMinus size={24} strokeWidth={1.5} color={"black"} />
            </Button>
            <p className="w-6 text-center">{quantity}</p>
            <Button
              size="icon"
              variant="outline"
              className="border p-1 w-8 h-8 rounded-md hover:bg-neutral-300 transition duration-200 hover:border-neutral-300"
              onClick={onAdd}
            >
              <IconPlus size={24} strokeWidth={1.5} color={"black"} />
            </Button>
          </div>
          <Button
            size="icon"
            className="row-start-2 w-8 h-8 col-start-3 place-self-center bg-ogDestructive p-1.5 rounded-md shadow-md hover:bg-ogDestructive-dark"
            onClick={onRemoveAll}
          >
            <IconTrash
              size={24}
              strokeWidth={1.5}
              color={"#F7BFBF"}
              className=""
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
