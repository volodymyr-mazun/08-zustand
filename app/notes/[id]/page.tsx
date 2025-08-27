
// ----------СТОРІНКА ВИКОРИСТАННЯ HYDRATIONBOUONDARY ДЛЯ ПЕРЕДАЧІ КЕШУ КЛІЄНТСЬКОМУ КОМПОНЕНТУ----------

import { HydrationBoundary, dehydrate, QueryClient, } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: Props ) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient noteId={id} />
        </HydrationBoundary>
    );
}