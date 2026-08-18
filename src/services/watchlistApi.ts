import axios from "axios";
import type { Repository } from "../types";

const urlPath = `http://localhost:4000/watchlist`;


export async function fetchWatchList() {
    const { data } = await axios.get(urlPath);
    return data;
};

export async function addToWatchList({ item, watchlist }: { item: Repository, watchlist: Repository[] }) {
    const watchedRepo = watchlist?.find((watchItem: Repository) => watchItem.full_name === item.full_name)
    if (watchedRepo) {
        await deleteFromWatchList(watchedRepo.id);
        return;
    }

    const { data } = await axios.post(urlPath, item);
    return data;
};

export async function editWatchlist({ id, note }: { id: string, note: string }) {
    const { data } = await axios.patch(`${urlPath}/${id}`, { note });
    return data;
};


export async function deleteFromWatchList(id: string) {
    const { data } = await axios.delete(`${urlPath}/${id}`);
    return data;
};