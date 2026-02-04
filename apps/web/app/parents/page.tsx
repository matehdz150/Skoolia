import ParentsNavbar from "@/components/layout/ParentsNavbar";
import HeroParentsSection from "@/components/home/HeroParentsSection";
import CategoriesSection from "@/components/home/CategoriesParentsSection";
import CatalogSection from "@/components/home/CatalogParentsSection";

export default function ParentsPage() {
    return (
        <>
            <ParentsNavbar />
            <main>
                <HeroParentsSection />
                <CategoriesSection />
                <CatalogSection />
            </main>
        </>
    );
}
