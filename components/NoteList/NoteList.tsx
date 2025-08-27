
// ----------КОМПОНЕНТ, РЕНДЕРИТЬ СПИСОК ЕЛЕМЕНТІВ НОТАТКІВ----------

"use client";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface NoteListProps {
    notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
    const queryClient = useQueryClient();

    const { mutate: removeNote, isPending } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

  // ----------Видалення нотатки----------
    const handleDelete = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.confirm("Delete this note? This action cannot be undone.")) {
            removeNote(id);
        }
    };

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h3 className={css.title}>{note.title}</h3>
                    <p className={css.content}>{note.content}</p>

                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag || "No tag"}</span>
                        <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
                            <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                            <button onClick={(e) => handleDelete(String(note.id), e)} aria-label={`Delete note: ${note.title}`} className={css.button} >{isPending ? "Deleting..." : "Delete"}</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default NoteList;