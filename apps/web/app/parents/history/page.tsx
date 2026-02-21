import ParentsNavbar from '@/components/layout/ParentsNavbar';
import ParentProfileHeader from '@/components/parents/ParentProfileHeader';
import ParentsSidebar from '@/components/parents/ParentsSidebar';

export default function ParentsHistoryPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <ParentProfileHeader />
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr]">
          <ParentsSidebar active="history" />
          <section className="w-full rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h3 className="text-2xl font-extrabold text-slate-900">Historial</h3>
            <p className="mt-1 text-sm text-slate-600">Pronto verás aquí tu actividad reciente.</p>
          </section>
        </div>
      </main>
    </>
  );
}
