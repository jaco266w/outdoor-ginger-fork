"use client";

import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingCart from "@/components/Cart/ShoppingCart";
import useAuthStore from "@/lib/store/authStore";
import useCartStore from "@/lib/store/cartStore";

function MobileHeader() {
	const playerRef1 = useRef();
	const playerRef2 = useRef();
	const [isDivVisible, setIsDivVisible] = useState(false);

	const { cart } = useCartStore();
	const { user } = useAuthStore();

	const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

	const handleClick1 = () => {
		const player = playerRef1.current;
		setCartOpen(false);
		if (player) {
			player.play();
			const onComplete = () => {
				setIsDivVisible(true);
				player.removeEventListener("complete", onComplete);
			};
			player.addEventListener("complete", onComplete);
		}
	};

	const handleClick2 = () => {
		const player = playerRef2.current;
		if (player) {
			player.play();
			const onComplete = () => {
				setIsDivVisible(false);
				player.removeEventListener("complete", onComplete);
			};
			player.addEventListener("complete", onComplete);
		}
	};

	useEffect(() => {
		import("@dotlottie/player-component/dist/dotlottie-player.js").then(() => {
			const player = playerRef1.current;
			if (player) {
				player.addEventListener("complete", () => {
					player.stop();
				});

				return () => {
					if (player) {
						player.removeEventListener("complete", () => {});
					}
				};
			}
		});
	}, []);

	useEffect(() => {
		import("@dotlottie/player-component/dist/dotlottie-player.js").then(() => {
			const player = playerRef2.current;
			if (player) {
				player.addEventListener("complete", () => {
					player.stop();
				});

				return () => {
					if (player) {
						player.removeEventListener("complete", () => {});
					}
				};
			}
		});
	}, []);

	useEffect(() => {
		if (isDivVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isDivVisible]);

	const [cartOpen, setCartOpen] = useState(false);

	const toggleCart = () => {
		setCartOpen(!cartOpen);
	};

	const cartRef = useRef(null);

	useEffect(() => {
		if (!cartOpen) return; // Only run if the cart is open

		const handleScroll = () => {
			if (cartRef.current) {
				const { top, bottom } = cartRef.current.getBoundingClientRect();
				if (window.scrollY < top || window.scrollY > bottom) {
					setCartOpen(false);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [cartOpen]);

	return (
		<header className="md:hidden z-60">
			<div className="fixed top-0 left-0 w-screen px-2 py-4 mx-auto z-60">
				<div className="w-full h-16 bg-ogBG-base rounded-xl flex items-center justify-between px-2 border border-x-neutral-200 border-t-neutral-200 border-b-0 border-opacity-50 shadow-lg">
					<Link
						href="/"
						className="flex ml-1"
						onClick={() => setCartOpen(false)}
						aria-label="Outdoorginger logo, click to go to homepage"
					>
						<Image src="/icons/logo.svg" width={120} height={120} alt="logo" />
					</Link>
					<ul className="flex w-full justify-end items-center text-sm font-normal whitespace-nowrap">
						<li
							className="relative"
							tabIndex={0}
							aria-label="Click to open shopping cart"
						>
							{totalItems > 0 && (
								<div className="absolute top-0 right-0 bg-ogPrimary text-ogBG-base rounded-full p-1 text-[10px] font-medium aspect-square w-4 h-4 flex items-center justify-center cursor-default">
									{totalItems}
								</div>
							)}
							<IconShoppingCart
								size={35}
								className={`stroke-[1.5px]  ${cartOpen ? "text-ogPrimary" : "text-ogLabel-base "}`}
								onClick={toggleCart}
							/>
						</li>
						<li tabIndex={0} aria-label="Click to open menu">
							<dotlottie-player
								aria-label="Click to open menu"
								key={isDivVisible}
								ref={playerRef1}
								src="/lottie/burgerMenu.lottie"
								background="transparent"
								speed="3"
								style={{
									width: "48px",
									userSelect: "none",
									WebkitUserSelect: "none",
									MsUserSelect: "none",
								}}
								playMode="normal"
								onClick={handleClick1}
							></dotlottie-player>
						</li>
					</ul>
				</div>
			</div>
			<AnimatePresence>
				{isDivVisible && (
					<motion.div
						className="bg-ogPrimary fixed w-screen h-screen overflow-y-hidden z-70 grid grid-rows-2"
						initial={{ y: "-100%" }}
						animate={{ y: "0%" }}
						exit={{ y: "-120%" }}
						transition={{ type: "spring", bounce: 0.2 }}
					>
						<nav className="flex flex-col row-start-1 justify-between">
							<div className="place-self-end">
								<dotlottie-player
									key={isDivVisible}
									ref={playerRef2}
									src="/lottie/closeMatches.lottie"
									background="transparent"
									speed="2"
									style={{
										width: "65px",
										height: "65px",
										userSelect: "none",
										webkitUserSelect: "none",
										MsUserSelect: "none",
									}}
									playMode="normal"
									onClick={handleClick2}
									aria-label="Click to close menu"
								/>
							</div>
							<ul className="flex flex-col vh-sm:mx-8 vh-sm:flex-row justify-between gap-4 items-center flex-wrap text-3xl font-display font-bold text-ogBG-base capitalize">
								<li>
									<Link href="/" onClick={() => setIsDivVisible(false)}>
										Home
									</Link>
								</li>
								{user === null ? (
									<li>
										<Link
											href="/membership"
											onClick={() => setIsDivVisible(false)}
										>
											Membership
										</Link>
									</li>
								) : (
									<li>
										<Link
											href="/profile"
											onClick={() => setIsDivVisible(false)}
										>
											Your Membership
										</Link>
									</li>
								)}
								<li>
									<Link
										href="/equipment"
										onClick={() => setIsDivVisible(false)}
									>
										Equipment
									</Link>
								</li>
								<li>
									<Link href="/blog" onClick={() => setIsDivVisible(false)}>
										Blog
									</Link>
								</li>
								<li>
									<Link href="/about" onClick={() => setIsDivVisible(false)}>
										About
									</Link>
								</li>
								{user === null ? (
									<li>
										<Link href="/login" onClick={() => setIsDivVisible(false)}>
											Login
										</Link>
									</li>
								) : null}
							</ul>
						</nav>
						<div className="absolute top-[60vh] flex items-center justify-center vh-sm:hidden">
							<Image
								width={120}
								height={120}
								src="/icons/flameWhite.svg"
								alt="flame icon"
								className="h-[120vw] w-full object-cover"
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{cartOpen && (
					<ShoppingCart setCartOpen={setCartOpen} cartRef={cartRef} />
				)}
			</AnimatePresence>
		</header>
	);
}

export default MobileHeader;
