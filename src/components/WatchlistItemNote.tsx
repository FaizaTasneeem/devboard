import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

function WatchlistItemNote({ item }) {
    const queryClient = useQueryClient();
    const [inputText, setInputText] = useState(item.note || "");

    const { mutateAsync } = useMutation({
        mutationFn: editWatchlist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    })

    async function editWatchlist({ id, note }: { id: string, note: string }) {
        const { data } = await axios.patch(`http://localhost:4000/watchlist/${id}`, { note });
        return data;
    }

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