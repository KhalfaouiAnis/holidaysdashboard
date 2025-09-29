"use client"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useBullet } from "./use-bullet";
import { AMENITIES } from "@/core/constants";

interface EllipticBulletsProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

export function Bullet({ selected, onChange }: EllipticBulletsProps) {
    // const { selectedItems, toggleItem } = useBullet();

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
                {AMENITIES.map((bullet) => (
                    <CommandItem
                        key={bullet.value}
                        onSelect={() => toggleBullet(bullet.value)}
                        className={`inline-flex items-center space-x-2 cursor-pointer rounded-xl mx-1
                                    ${selected.includes(bullet.value) ? 'bg-slate-200' : ''}`
                        }
                    >
                        <span>{bullet.label}</span>
                    </CommandItem>
                ))}
            </CommandGroup>
        </Command>
    );
}