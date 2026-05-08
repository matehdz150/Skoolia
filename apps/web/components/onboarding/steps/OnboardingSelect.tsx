"use client";

import { LucideIcon } from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";

interface OnboardingSelectProps {
  label: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: LucideIcon;
  error?: string;
  className?: string;
  showSearch?: boolean;
}

export default function OnboardingSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  className,
  showSearch = false,
}: OnboardingSelectProps) {
  return (
    <CustomSelect
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon={Icon}
      error={error}
      className={className}
      showSearch={showSearch}
      itemClassName="py-3 text-lg"
    />
  );
}
