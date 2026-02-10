import ParentsNavbar from "@/components/layout/ParentsNavbar";
import HeroParentsSection from "@/components/home/HeroParentsSection";
import CategoriesSection from "@/components/home/CategoriesParentsSection";
import CatalogSection from "@/components/home/CatalogParentsSection";

export default function ParentsPage() {
    return (
        <>
            <ParentsNavbar />
            <main className="pt-6 md:pt-8">
                <div className="space-y-10 md:space-y-14">
                    <HeroParentsSection />
                    <CategoriesSection />
                    <CatalogSection />
                </div>
            </main>
        </>
    );
}
