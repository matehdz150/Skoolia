import ParentsSectionLayout from '@/components/parents/ParentsSectionLayout';
import StudentSection from '@/components/parents/StudentSection';

export default function ParentsSettingsPage() {
  return (
    <>
      <ParentsSectionLayout active="info">
        <StudentSection />
      </ParentsSectionLayout>
    </>
  );
}
