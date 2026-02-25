import SchoolsNavbar from "@/components/schools/SchoolsNavbar";
import SchoolsSidebar from "@/components/schools/SchoolsSidebar";
import SchoolSummaryHeader from "@/components/schools/SchoolSummaryHeader";
import SchoolMessagesSection from "@/components/schools/SchoolMessagesSection";

export default function SchoolsMessagesPage() {
	return (
		<>
			<SchoolsNavbar />
			<main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
					<SchoolsSidebar active="messages" />
					<div className="space-y-5 sm:space-y-6">
						{/* <SchoolSummaryHeader /> */}

						<SchoolMessagesSection />
					</div>
				</div>
			</main>
		</>
	);
}
