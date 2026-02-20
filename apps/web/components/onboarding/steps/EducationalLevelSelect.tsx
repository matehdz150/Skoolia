"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/contexts/OnBoardingContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { GraduationCap, Check, ChevronDown } from "lucide-react";

const educationalLevels = [
  "Maternal",
  "Preescolar",
  "Primaria",
  "Secundaria",
  "Preparatoria",
  "Universidad",
];

export default function EducationalLevelSelect() {
  const { state, setField } = useOnboarding();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">
        Nivel educativo
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="
              w-full
              h-16
              justify-between
              rounded-full
              bg-[#f3f3f3]
              border-0
              text-base
              px-8
              hover:bg-[#ececec]
            "
          >
            {state.data.educationalLevel || "Selecciona un nivel"}

            <ChevronDown className="ml-2 h-5 w-5 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[400px] p-2 rounded-2xl"
          align="start"
        >
          <Command>
            <CommandGroup>
              {educationalLevels.map((level) => (
                <CommandItem
                  key={level}
                  onSelect={() => {
                    setField("educationalLevel", level);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 text-lg"
                >
                  <GraduationCap className="w-5 h-5 text-blue-600" />

                  {level}

                  {state.data.educationalLevel === level && (
                    <Check className="ml-auto w-4 h-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {state.errors.educationalLevel && (
        <p className="text-sm text-red-500 px-2">
          {state.errors.educationalLevel}
        </p>
      )}
    </div>
  );
}
