
// ----------СТОРІНКА ВИКОРИСТАННЯ HYDRATIONBOUONDARY ДЛЯ ПЕРЕДАЧІ КЕШУ КЛІЄНТСЬКОМУ КОМПОНЕНТУ----------

import { HydrationBoundary, dehydrate, QueryClient, } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from 'next';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return {
        title: `Note : ${note.title}`,
        description: note.content.slice(0, 30) || '',
        openGraph: {
            title: `Note : ${note.title}`,
            description: note.content.slice(0, 30) || '',
            url: `https://08-zustand-wheat.vercel.app/notes/${id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Note Open Graph Image',
                },
            ], type: 'article',
        },
    };
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