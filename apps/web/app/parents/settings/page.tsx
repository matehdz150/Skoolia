import ParentsCompactSidebar from '@/components/parents/ParentsCompactSidebar';
import StudentSection from '@/components/parents/StudentSection';

export default function ParentsSettingsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[96px_1fr]">
          <ParentsCompactSidebar active="info" />
          <StudentSection />
        </div>
      </main>
    </>
  );
}
