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
              width={300}
              height={300}
              className="object-cover w-full hover:scale-[102%] transition-all duration-500"
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
        <Button variant="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
