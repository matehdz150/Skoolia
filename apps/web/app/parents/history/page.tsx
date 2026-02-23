import HistoryEmptyState from '@/components/parents/HistoryEmptyState';
import ParentsSectionLayout from '@/components/parents/ParentsSectionLayout';

export default function ParentsHistoryPage() {
  return (
    <>
      <ParentsSectionLayout active="history">
        <HistoryEmptyState />
      </ParentsSectionLayout>
    </>
  );
}
