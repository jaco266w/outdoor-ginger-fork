"use client";

import { Button } from "../ui/button";
import useAuthStore from "@/lib/store/authStore";
import useCartStore from "@/lib/store/cartStore";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProductInteraction({ product }) {
	console.log(product);
	const { user } = useAuthStore();
	const { cart, addToCart } = useCartStore();

	const handleAddToCart = () => {
		addToCart(product);
		toast.success(`1 ${product.title} added to cart`);
	};

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	return (
		<div className="flex flex-col gap-4 -mt-8">
			{user ? (
				<div className="flex gap-4 items-center">
					<h2 className="text-xl font-medium line-through">
						{product.price} €
					</h2>
					<div className="flex flex-col items-start h-fit">
						<p className="text-sm m-0">Member Price</p>
						<h2 className="text-xl font-medium text-ogPrimary m-0">
							{product.memberPrice} €
						</h2>
					</div>
				</div>
			) : (
				<h2 className="text-xl font-medium">{product.price} €</h2>
			)}
			{product.isAffiliate ? (
				<Link href={product.affiliateLink} target="_blank">
					<Button variant="primary" className="w-fit -mt-6">
						Buy on Amazon
					</Button>
				</Link>
			) : (
				<Button
					variant="primary"
					className="w-fit -mt-6"
					onClick={handleAddToCart}
				>
					Add to cart
				</Button>
			)}
		</div>
	);
}
