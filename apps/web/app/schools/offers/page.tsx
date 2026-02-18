import SchoolsNavbar from "@/components/schools/SchoolsNavbar";
import SchoolsSidebar from "@/components/schools/SchoolsSidebar";
import SchoolSummaryHeader from "@/components/schools/SchoolSummaryHeader";
import SchoolOffersSection from "@/components/schools/SchoolOffersSection";

export default function SchoolsOffersPage() {
	return (
		<>
			<SchoolsNavbar />
			<main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
					<SchoolsSidebar active="offers" />
					<div className="space-y-5 sm:space-y-6">
						{/* <SchoolSummaryHeader /> */}

						<SchoolOffersSection />
					</div>
				</div>
			</main>
		</>
	);
}
