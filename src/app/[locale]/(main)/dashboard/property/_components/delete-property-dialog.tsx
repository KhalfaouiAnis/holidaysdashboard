'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/core/constants";
import { queryClient } from "@/providers/query-provider";
import { deleteProperty } from "@/server/property/property-actions";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeletePropertyDialogProps {
    id?: string;
    ids?: string[];
    propertyName?: string;
    fullWidth?: boolean;
    outline?: boolean
}

export default function DeletePropertyDialog({ id, ids, propertyName, fullWidth = true, outline = false }: DeletePropertyDialogProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteProperty({ id, ids });
            await queryClient.invalidateQueries({ queryKey: queryKeys.PROPERTIES });
            setOpen(false);
        } catch (error: any) {
            console.error("Delete error:", error.message);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Button variant={outline ? "outline" : "ghost"} size="sm" className={`${fullWidth ? 'w-full' : ''}`} onClick={() => setOpen(true)}>
                <Trash className="text-red-500" />
            </Button>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Property</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{propertyName ? propertyName : "the selected properties"}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}