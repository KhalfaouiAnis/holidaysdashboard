"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } });

export function QueryProvider({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}