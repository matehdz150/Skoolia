import InstitutionCard from './InstitutionCard';

const demo = [
  {
    id: 1,
    imageUrl: '',
    badges: ['Bilingüe', 'Excelencia'],
    level: 'PRIMARIA / SECUNDARIA',
    title: 'Instituto Tecnológico del Norte',
    location: 'Monterrey, NL',
    price: '$4,500 MXN/mes',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop',
    badges: ['STEM', 'SABATINO'],
    level: 'CURSO EXTRACURRICULAR',
    title: 'Academia de Robótica "Future"',
    location: 'CDMX, Polanco',
    price: '$1,200 MXN/mes',
  },
];

export default function FavoritesGrid() {
  return (
    <section className="w-full rounded-4xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h3 className="text-2xl font-extrabold text-slate-900">Instituciones Guardadas</h3>
      <p className="mt-1 text-sm text-slate-600">Tus opciones favoritas para Carlos.</p>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        {demo.map((item) => (
          <InstitutionCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
