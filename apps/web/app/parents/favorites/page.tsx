import ParentsNavbar from '@/components/layout/ParentsNavbar';
import ParentProfileHeader from '@/components/parents/ParentProfileHeader';
import ParentsSidebar from '@/components/parents/ParentsSidebar';
import FavoritesGrid from '@/components/parents/FavoritesGrid';

export default function ParentsFavoritesPage() {
  return (
    <>
      <ParentsNavbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <ParentProfileHeader />
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
          <ParentsSidebar active="favorites" />
          <div className="w-full">
            <h3 className="text-2xl font-extrabold text-slate-900">Instituciones Guardadas</h3>
            <p className="mt-1 text-sm text-slate-600">Tus opciones favoritas para Carlos.</p>
            <div className="mt-6">
              <FavoritesGrid />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
