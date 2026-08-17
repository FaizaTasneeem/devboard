import { useState, useEffect } from "react";
import type { Repository } from "../types";
import { useEditWatchlist } from "../hooks/useWatchlistQueries";

function WatchlistItemNote({ item }: { item: Repository }) {
    const [inputText, setInputText] = useState(item.note || "");

    const { mutateAsync } = useEditWatchlist();

    useEffect(() => {
        if (inputText !== (item.note || "")) {
            const timer = setTimeout(() => {
                mutateAsync({ id: item.id, note: inputText })
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [inputText]);

    return (
        <div>
            <input
                type="text"
                className="mt-4 p-2 rounded-lg"
                placeholder="add a note..."
                value={inputText}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setInputText(e.target.value)}
            />
        </div>
    )
}

export default WatchlistItemNote