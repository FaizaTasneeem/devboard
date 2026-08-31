import axios from "axios";
import type { Repository } from "../types";

const server = import.meta.env.VITE_BACKEND_SERVER_LESSON || 'http://localhost:5000/api';


export async function fetchWatchList() {
    const { data } = await axios.get(`${server}/watchlist/getList`);
    return data;
};

export async function addToWatchList({ item, watchlist }: { item: Repository, watchlist: Repository[] }) {
    const watchedRepo = watchlist?.find((watchItem: Repository) => watchItem.full_name === item.full_name)
    if (watchedRepo) {
        await deleteFromWatchList(watchedRepo.id);
        return;
    }

    const { data } = await axios.post(`${server}/watchlist/create`, item);
    return data;
};

export async function editWatchlist({ id, note }: { id: string, note: string }) {
    const { data } = await axios.patch(`${server}/watchlist/update/${id}`, { note });
    return data;
};


export async function deleteFromWatchList(id: string) {
    const { data } = await axios.delete(`${server}/watchlist/delete/${id}`);
    return data;
};