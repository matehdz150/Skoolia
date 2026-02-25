import ParentsSectionLayout from '@/components/parents/ParentsSectionLayout';
import FavoritesGrid from '@/components/parents/FavoritesGrid';

export default function ParentsFavoritesPage() {
  return (
    <>
      <ParentsSectionLayout active="favorites">
        <div className="mt-6">
          <FavoritesGrid />
        </div>
      </ParentsSectionLayout>
    </>
  );
}
