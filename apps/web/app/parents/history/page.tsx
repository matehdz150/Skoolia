import ParentsCompactSidebar from '@/components/parents/ParentsCompactSidebar';
import HistoryEmptyState from '@/components/parents/HistoryEmptyState';

export default function ParentsHistoryPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[96px_1fr]">
          <ParentsCompactSidebar active="history" />
          <HistoryEmptyState />
        </div>
      </main>
    </>
  );
}
