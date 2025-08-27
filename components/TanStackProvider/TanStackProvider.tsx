// ----------КОМПОНЕНТ, ДОСТУП ВСІМ КЛІЄНТСЬКИМ КОМПОНЕНТАМ ДО QUERYCLIENT----------

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
}

const TanStackProvider = ({ children }: Props) => {
    const [queryClient] = useState(() => new QueryClient())
        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
}

export default TanStackProvider;