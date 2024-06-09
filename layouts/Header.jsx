"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHeartHandshake, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import ShoppingCart from "@/components/Cart/ShoppingCart";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import useAuthStore from "@/lib/store/authStore";
import useCartStore from "@/lib/store/cartStore";
import { client } from "@/lib/sanity/client";
import { logout } from "@/lib/supabase/actions";

function Header() {
  const { user } = useAuthStore();
  const { cart } = useCartStore();

  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [donationProgress, setDonationProgress] = useState(0);

  useEffect(() => {
    const fetchDonationProgress = async () => {
      const data = await client.fetch(`*[_type == "donation"]{procent}`);
      let dataString = data[0].procent.toString() + "%";
      setDonationProgress(dataString);
    };
    fetchDonationProgress();
  }, []);

  const pathname = usePathname();

  const linkStyle = (path) => (pathname === path ? "p-2 text-ogPrimary" : "p-2");

  const { scrollY } = useScroll();

  const handleVisibility = (scrollPosition) => {
    const shouldHide = scrollPosition > prevScroll && scrollPosition > 60;
    setHidden(shouldHide);
    if (shouldHide && cartOpen) {
      setCartOpen(false); // Also close the cart when hiding the header
    }
    setPrevScroll(scrollPosition);
  };

  useMotionValueEvent(scrollY, "change", handleVisibility);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY <= window.innerHeight / 3 && hidden) {
        setHidden(false); // Show header if mouse is in the top third
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hidden]);

  const toggleCart = () => {
    if (!cartOpen && hidden) {
      setHidden(false); // Ensure header is visible when opening the cart
    }
    setCartOpen(!cartOpen);
  };

  return (
    <header>
      <motion.div
        className="hidden md:block fixed top-0 left-0 z-80 w-screen px-8 py-4"
        animate={{ y: hidden ? "-60%" : "0" }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.3,
        }}
      >
        <div className="max-w-7xl overflow-hidden mx-auto  rounded-t-xl z-40 drop-shadow-xl">
          <div className=" w-full h-20 bg-ogBG-base rounded-t-xl flex items-center justify-between px-8 border border-x-neutral-200 border-t-neutral-200 border-b-0 border-opacity-50 mx">
            <motion.div className="opacity-0" animate={{ opacity: 1 }} transition={{ duration: 2, type: "spring" }}>
              <Link href="/" className="flex">
                <dotlottie-player src="/lottie/iconText.lottie" background="transparent" speed="1" style={{ width: "150px" }} direction="1" playMode="bounce" loop autoplay hover onClick={() => setCartOpen(false)}></dotlottie-player>
              </Link>
            </motion.div>
            <div className="flex gap-8 items-center w-full justify-end">
              <nav className={`w-full ${user ? "max-w-md" : "max-w-xl"}`}>
                <ul className="flex w-full justify-between items-center text-sm font-normal whitespace-nowrap">
                  {user ? (
                    <li>
                      <Link className={linkStyle("/profile")} href="/profile" onClick={() => setCartOpen(false)}>
                        Your membership
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link className={linkStyle("/membership")} href="/membership" onClick={() => setCartOpen(false)}>
                        Membership
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className={linkStyle("/equipment")} href="/equipment" onClick={() => setCartOpen(false)}>
                      Equipment
                    </Link>
                  </li>
                  <li>
                    <Link className={linkStyle("/blog")} href="/blog" onClick={() => setCartOpen(false)}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className={linkStyle("/about")} href="/about" onClick={() => setCartOpen(false)}>
                      About
                    </Link>
                  </li>
                  {user === null ? (
                    <li>
                      <Link href="/login" onClick={() => setCartOpen(false)}>
                        <Button variant="outline">Log in</Button>
                      </Link>
                    </li>
                  ) : null}
                  {user !== null ? (
                    <li>
                      <Link
                        href="/"
                        onClick={() => {
                          logout();
                          setCartOpen(false);
                        }}
                      >
                        <Button variant="outline">Log out</Button>
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </nav>
              <div className="relative">
                {totalItems > 0 && <div className="absolute -top-2.5 -right-2.5 bg-ogPrimary text-ogBG-base rounded-full p-1 text-[10px] font-medium aspect-square w-4 h-4 flex items-center justify-center cursor-default">{totalItems}</div>}
                <IconShoppingCart size={24} className={`stroke-[1.5px] cursor-pointer ${cartOpen ? "text-ogPrimary" : "text-ogLabel-base "}`} onClick={toggleCart} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-7xl mx-auto drop-shadow-xl ">
          <div className="w-full">
            <div className=" h-3 w-full mx-auto flex bg-ogBG-sub relative z-30 rounded-bl-xl overflow-hidden ">
              <motion.div
                className="w-0 h-3 absolute top-0 left-0"
                animate={{
                  width: donationProgress,
                  backgroundColor: donationProgress === "100%" ? "oklch(var(--og-warning))" : "oklch(var(--og-primary))",
                }}
                transition={{ duration: 1.8, type: "spring" }}
              ></motion.div>
            </div>
            <div className=" w-full mx-auto flex h-full">
              <motion.div className="w-0 h-0 opacity-0" animate={{ width: donationProgress }} transition={{ duration: 1.8, type: "spring" }}></motion.div>
              {donationProgress !== "100%" && (
                <motion.div
                  className="origin-right -translate-x-full -translate-y-[1px] z-50 text-ogBG-base h-fit p-2 rounded-b-xl text-sm font-medium opacity-0"
                  animate={{
                    opacity: 1,
                    backgroundColor: "oklch(var(--og-primary))",
                  }}
                  transition={{ duration: 1.8, type: "spring" }}
                >
                  <p className="cursor-default text-ogBG-base">{donationProgress}</p>
                </motion.div>
              )}
            </div>
          </div>
          <div className="w-fit h-fit  mx-auto flex justify-end">
            <div className={`w-fit h-full max-w-xs justify-self-end rounded-b-xl flex justify-between gap-4 items-center px-2 py-2 z-30 ${donationProgress === "100%" ? "bg-ogWarning" : "bg-ogBG-sub"}`}>
              <p className={`whitespace-nowrap text-sm font-normal cursor-default pl-2 ${donationProgress === "100%" ? "text-ogWarning-darker" : "text-ogLabel-muted"}`}>{donationProgress === "100%" ? "Fully funded!" : "Goal: 1500€"}</p>
              <Link href="https://www.gofundme.com/f/outdoorginger" target="_blank">
                <Button variant="primary" size="sm" className={`gap-1 ${donationProgress === "100%" ? "bg-ogWarning-dark hover:bg-ogWarning-darker text-ogWarning-lightest" : "bg-ogPrimary hover:bg-ogPrimary-dark"}`}>
                  Donate
                  <IconHeartHandshake size={20} className="stroke-[1.5px]" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>{cartOpen && <ShoppingCart setCartOpen={setCartOpen} />}</AnimatePresence>
    </header>
  );
}

export default Header;
