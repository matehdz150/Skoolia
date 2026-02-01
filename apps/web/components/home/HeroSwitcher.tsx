'use client';
import { useSearchParams } from 'next/navigation';
import HeroParentsSection from './HeroParentsSection';
import HeroInstitutionSection from './HeroInstitutionSection';

export default function HeroSwitcher() {
  const params = useSearchParams();
  const audience = params.get('audience');
  return audience === 'schools' ? (
    <HeroInstitutionSection />
  ) : (
    <HeroParentsSection />
  );
}
