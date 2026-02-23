import ParentsCompactSidebar from '@/components/parents/ParentsCompactSidebar';
import FavoritesGrid from '@/components/parents/FavoritesGrid';

export default function ParentsFavoritesPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[96px_1fr]">
          <ParentsCompactSidebar active="favorites" />
          <div className="w-full">
            <div className="mt-6">
              <FavoritesGrid />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
