import Navbar from "@/components/layout/Navbar";
import HeroParentsSection from "@/components/home/HeroParentsSection";
import HeroInstitutionSection from "@/components/home/HeroInstitutionSection";
import CategoriesSection from "@/components/home/CategoriesParentsSection";
import CatalogSection from "@/components/home/CatalogParentsSection";
import CallParentsSections from "@/components/home/CallParentsSections";
import ChallengeInstitutionsSection from "@/components/home/ChallengeInstitutionsSection";
import BussinessSections from "@/components/home/BussinessSections";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home({ searchParams }: { searchParams?: Promise<SearchParams> }) {
	const params = (await searchParams) ?? {};
	const rawAudience = params.audience;
	const audience = Array.isArray(rawAudience) ? rawAudience[0] : rawAudience;
	const isParents = audience !== "schools"; // default to parents when undefined
	return (
		<>
			<Navbar />
			<main>
				{isParents ? (
					<>
						<HeroParentsSection />
						<CategoriesSection />
						<CatalogSection />
						<CallParentsSections />
					</>
				) : (
					<>
						<HeroInstitutionSection />
						<ChallengeInstitutionsSection />
						<BussinessSections />
					</>
				)}
			</main>
		</>
	);
}
