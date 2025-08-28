// ----------КОМПОНЕНТ ДЛЯ HTTP-ЗАПИТУ----------

import axios from "axios";
import type { Note, CreateNotePayload } from "../types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});

// ----------Отримати список нотаток----------
interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: string;
}

export async function fetchNotes({
    page = 1,
    perPage = 12,
    search = "",
    tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
    const params: Record<string, string | number> = { page, perPage };

    if (search) params.search = search;
    if (tag && tag !== "All") params.tag = tag;

    const response = await api.get<FetchNotesResponse>("/notes", { params });
    return response.data;
}

// ----------Створення нової нотатки----------
export async function createNote(payload: CreateNotePayload): Promise<Note> {
    const response = await api.post<Note>("/notes", payload);
    return response.data;
}

// ----------Видалення нотатки за ID----------
export async function deleteNote(id: string): Promise<Note> {
    const response = await api.delete(`/notes/${ id }`);
    return response.data; 
}

// ----------Отримати одну нотатку за її ID----------
export async function fetchNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${ id }`);
    return response.data;
}