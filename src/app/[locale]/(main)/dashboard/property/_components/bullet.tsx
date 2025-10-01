"use client"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { AMENITIES } from "@/core/constants";
import { Check } from "lucide-react";

interface EllipticBulletsProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

export function Bullet({ selected, onChange }: EllipticBulletsProps) {
    const toggleBullet = (bullet: string) => {
        if (selected.includes(bullet)) {
            onChange(selected.filter((item) => item !== bullet));
        } else {
            onChange([...selected, bullet]);
        }
    };

    return (
        <Command className="rounded-lg border shadow-md">
            <CommandGroup className="flex flex-row p-2">
                {AMENITIES.map((item) => (
                    <CommandItem
                        key={item}
                        onSelect={toggleBullet}
                        className={`inline-flex items-center space-x-2 my-1 cursor-pointer rounded-xl mx-1 hover:bg-transparent
                                    ${selected.includes(item) ? 'bg-slate-200' : ''}`
                        }
                    >
                        <span className="inline-flex items-center gap-x-1">
                            {selected.includes(item) && <Check />}
                            {item}
                        </span>
                    </CommandItem>
                ))
                }
            </CommandGroup>
        </Command>
    );
}