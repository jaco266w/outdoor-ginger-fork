"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import Item from "./Item";
import useCartStore from "@/lib/store/cartStore";
import useAuthStore from "@/lib/store/authStore";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ShoppingCart({ setCartOpen, cartRef }) {
	const {
		cart,
		addToCart,
		removeFromCart,
		removeAllFromCart,
		loadCart,
		removeAllItems,
	} = useCartStore();
	const { user } = useAuthStore();

	useEffect(() => {
		loadCart();
	}, [loadCart]);

	const handleAddToCart = (product) => {
		addToCart(product);
		toast.success(`1 ${product.title} added to cart`);
	};

	const handleRemoveFromCart = (product) => {
		removeFromCart(product._id);
		toast.success(`1 ${product.title} removed from cart`);
	};

	const handleRemoveAllFromCart = (product) => {
		removeAllFromCart(product._id);
		toast.success(`All ${product.title} removed from cart`);
	};

	const handleRemoveAllItems = () => {
		removeAllItems();
		setCartOpen(false);
	};

	return (
		<div className="overflow-hidden fixed -top-6 md:top-7 left-0 z-50 md:z-80 w-full px-2 md:px-0 mt-12 max-w-7xl mx-auto md:left-1/2 md:transform md:-translate-x-1/2 h-[100%] pointer-events-none ">
			<motion.div
				ref={cartRef}
				initial={{ y: "-100%", opacity: 0 }}
				animate={{ y: "0px", opacity: 1 }}
				exit={{ y: "-100%", opacity: 0 }}
				transition={{
					duration: 0.8,
					type: "spring",
					bounce: 0.25,
					opacity: { duration: 0.3 },
				}}
				className="md:mr-8 cart:mr-0"
			>
				<div className="bg-ogBG-base rounded-b-2xl max-h-[80lvh] md:max-h-[650px] md:max-w-96  ml-auto flex flex-col justify-between pointer-events-auto drop-shadow-xl relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-ogBG-base to-transparent pointer-events-none"></div>
					<div className="px-8 space-y-6 overflow-y-scroll scrollbar scrollbar-thumb-ogPrimary scrollbar-track-ogBG-base pt-24 md:pt-8 pb-8">
						{cart.length === 0 ? (
							<p className="text-center text-ogLabel-muted">
								Your cart is empty
							</p>
						) : (
							cart.map((product) => (
								<Item
									key={product._id}
									imgSrc={product.images[0]}
									name={product.title}
									price={user ? product.memberPrice : product.price}
									quantity={product.quantity}
									onAdd={() => handleAddToCart(product)}
									onRemove={() => handleRemoveFromCart(product)}
									onRemoveAll={() => handleRemoveAllFromCart(product)}
								/>
							))
						)}
					</div>
					{cart.length > 0 && (
						<div className="bg-neutral-200 md:pb-4">
							<div className="px-12 pt-4 pb-2 flex flex-col gap-3">
								<div className=" flex justify-between font-normal">
									<p>Subtotal</p>
									<p>
										{cart
											.reduce((total, product) => {
												return (
													total +
													(user ? product.memberPrice : product.price) *
														product.quantity
												);
											}, 0)
											.toFixed(2)}
										€
									</p>
								</div>
								<hr className="bg-neutral-300 h-[3px]" />
								<Link href="/checkout" className="w-full">
									<Button
										variant="primary"
										size="sm"
										className="w-full"
										onClick={() => setCartOpen(false)}
									>
										Checkout
									</Button>
								</Link>
								<hr className="block md:hidden bg-neutral-300 h-[8px] w-1/2 mx-auto rounded-full mt-3" />
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
}
