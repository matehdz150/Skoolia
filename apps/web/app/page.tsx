import Navbar from "@/components/layout/Navbar";
import HeroSwitcher from "@/components/home/HeroSwitcher";
import CategoriesSection from "@/components/home/CategoriesSection";
import CatalogSection from "@/components/home/CatalogSection";

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<HeroSwitcher />
				<CategoriesSection />
				<CatalogSection />
			</main>
		</>
	);
}
