import "./globals.css";
import "./normalize.css";
import { Inter, Syne } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import MobileHeader from "@/layouts/MobileHeader";
import CookieConsentDialog from "@/components/CookiesConsentDialog";
import AuthSubscriber from "@/components/AuthSubscriber";
import Donation from "@/layouts/Donation";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});
const syne = Syne({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-syne",
});

export const metadata = {
	title: "Outdoor Ginger",
	description:
		"Outdoor Ginger is a community of outdoor enthusiasts who love to explore the great outdoors yo",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en" className={`${inter.variable} ${syne.variable}`}>
			<head>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
					rel="stylesheet"
				/>

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/favicon/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body className="bg-ogBG-base text-ogLabel-base">
				<MobileHeader />
				<Header />
				<Donation />
				<AuthSubscriber />
				<Toaster
					richColors={true}
					toastOptions={{
						style: {
							background: "oklch(var(--og-bg-base))",
							color: "oklch(var(--og-label-base))",
							border: "1px solid oklch(var(--og-border-input))",
							borderRadius: "var(--og-radius-mobile)",
						},
					}}
					theme="light"
				/>
				<CookieConsentDialog />
				{children}
				<Footer />
			</body>
		</html>
	);
}
