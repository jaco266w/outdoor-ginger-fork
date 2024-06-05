"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { forkUrlFor } from "@/lib/sanity/client";
import useAuthStore from "@/lib/store/authStore";
import useCartStore from "@/lib/store/cartStore";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductCard({ product }) {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`1 ${product.title} added to cart`);
  };

  return (
    <Card
      className=" bg-ogBG-base rounded-xl overflow-hidden shadow w-full max-w-sm h-fit"
      key={product._id}
    >
      {product.images && product.images.length > 0 && (
        <Link href={`/equipment/${product.slug.current}`}>
          <div className="overflow-hidden">
            <Image
              src={forkUrlFor(product.images[0]).url()}
              alt={product.title}
              width={600}
              height={600}
              className="object-cover w-full hover:scale-[102%] transition-all duration-500 aspect-[8/6]"
            />
          </div>
        </Link>
      )}
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`/equipment/${product.slug.current}`}>
            <CardTitle className="text-xl font-medium">
              {product.title}
            </CardTitle>
          </Link>
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="text-lg line-through text-ogLabel-faint">
                {product.price} €
              </p>
              <div>
                <p className="text-sm text-ogLabel-faint">Member price</p>
                <p className="text-lg font-medium text-ogPrimary">
                  {product.memberPrice} €
                </p>
              </div>
            </div>
          ) : (
            <p className="text-lg">{product.price} €</p>
          )}
          <CardDescription className="text-sm">
            {product.description}
          </CardDescription>
        </div>
        {product.isAffiliate ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href={product.affiliateLink} target="_blank">
                  <Button variant="primary" className="w-full">
                    Buy on Amazon
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is an affiliate link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
