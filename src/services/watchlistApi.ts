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

    const formatted = getFormattedData(item);

    const { data } = await axios.post(`${server}/watchlist/create`, formatted);
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


export function getFormattedData(item: Repository) {
    return {
        id: String(item.id),
        githubId: Number(item.id),
        name: item.name,
        fullName: item.full_name,
        htmlUrl: item.html_url,
        ownerLogin: item.owner.login,
        ownerAvatarUrl: item.owner.avatar_url,
        stargazersCount: item.stargazers_count,
        forksCount: item.forks_count,
        watchersCount: item.watchers_count,
        openIssuesCount: item.open_issues_count,
        language: item.language ?? "",
        description: item.description ?? "",
        licenseSpdxId: item.license?.spdx_id ?? "",
        note: item.note ?? ""
    };
}