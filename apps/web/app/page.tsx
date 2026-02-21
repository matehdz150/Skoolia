import Navbar from "@/components/layout/Navbar";
import HeroParentsSection from "@/components/home/HeroParentsSection";
import HeroInstitutionSection from "@/components/home/HeroInstitutionSection";
import CategoriesSection from "@/components/home/CategoriesParentsSection";
import CatalogSection from "@/components/home/CatalogParentsSection";
import CallParentsSections from "@/components/home/CallParentsSections";
import ChallengeInstitutionsSection from "@/components/home/ChallengeInstitutionsSection";
import BussinessSections from "@/components/home/BussinessSections";
import Footer from "@/components/home/FooterParents";
import Reveal from "@/components/home/Reveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const rawAudience = params.audience;
  const audience = Array.isArray(rawAudience) ? rawAudience[0] : rawAudience;
  const isParents = audience !== "schools"; // default to parents when undefined
  return (
    <>
      <Navbar />
      <main className="">
        {isParents ? (
          <div className="space-y-10 md:space-y-14">
            <HeroParentsSection />
            <Reveal>
              <CatalogSection />
            </Reveal>
            <Reveal>
              <CategoriesSection />
            </Reveal>
            <CallParentsSections />
            <Footer />
          </div>
        ) : (
          <div className="space-y-10 md:space-y-14">
            <HeroInstitutionSection />
            <ChallengeInstitutionsSection />
            <BussinessSections />
          </div>
        )}
      </main>
    </>
  );
}
