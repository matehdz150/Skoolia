"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type SelectOption =
  | string
  | {
      value: string;
      label: string;
      keywords?: string[];
    };

type NormalizedOption = {
  value: string;
  label: string;
  keywords?: string[];
};

type CustomSelectProps = {
  label?: string;
  options: readonly SelectOption[] | SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: LucideIcon;
  error?: string;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
};

function normalizeOptions(options: readonly SelectOption[] | SelectOption[]): NormalizedOption[] {
  return options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );
}

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  showSearch = false,
  searchPlaceholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);
  const selectedLabel = normalizedOptions.find((option) => option.value === value)?.label;

  return (
    <div className={cn("space-y-3", className)}>
      {label ? (
        <label
          className={cn(
            "text-lg font-semibold text-slate-950",
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-16 w-full justify-between rounded-full border border-transparent bg-[#f3f3f3] px-8 text-left text-lg font-normal text-slate-900 shadow-none transition-all duration-200 hover:border-[#dbe7ff] hover:bg-[#ececec] focus-visible:border-[#1973FC]/35 focus-visible:ring-4 focus-visible:ring-[#1973FC]/15",
              triggerClassName,
            )}
          >
            <span className={cn("truncate", !selectedLabel && "text-neutral-500")}>
              {selectedLabel || placeholder}
            </span>
            <ChevronDown
              className={cn(
                "ml-2 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                open && "rotate-180 text-[#1973FC]",
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          className={cn(
            "w-[var(--radix-popover-trigger-width)] rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-[0_24px_64px_-28px_rgba(15,23,42,0.45)]",
            contentClassName,
          )}
        >
          <Command className="max-h-[320px] rounded-[1.25rem] bg-transparent">
            {showSearch ? (
              <CommandInput
                placeholder={searchPlaceholder || `Buscar ${label?.toLowerCase() || "opción"}...`}
                className="text-sm"
              />
            ) : null}
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup className="overflow-y-auto p-1">
                {normalizedOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={[option.value, option.label, ...(option.keywords || [])].join(" ")}
                    onSelect={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition-colors data-[selected=true]:bg-[#1973FC]/8 data-[selected=true]:text-slate-950",
                      itemClassName,
                    )}
                  >
                    {Icon ? <Icon className="h-4 w-4 text-[#1973FC]" /> : null}
                    <span className="truncate">{option.label}</span>
                    {value === option.value ? (
                      <Check className="ml-auto h-4 w-4 text-[#1973FC]" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error ? <p className="px-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
