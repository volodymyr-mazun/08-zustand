
// ----------ОБРОБКА ПОМИЛОК----------

"use client";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const NoteDetailsError = ({ error, reset }: ErrorProps ) => {
    return (
        <div>
            <h2>Помилка при завантаженні</h2>
            <p>Could not fetch note details.{error.message}</p>
            <button onClick={reset}>Спробувати знову</button>
        </div>
    )
}

export default NoteDetailsError;