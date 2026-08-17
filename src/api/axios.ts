import axios from "axios";
import type { Repository } from "../types";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const repos_per_page = 20;
const issues_per_page = 20;
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


export async function fetchRepos(query: string, pageParam: number) {
    const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&page=${pageParam}&per_page=${repos_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
    );

    return {
        total_count: data.total_count,
        items: data.items,
        nextPageParam: data?.items.length < repos_per_page ? undefined : pageParam + 1
    };
};


export async function searchRepoDetails(owner: string, name: string) {
    const { data } = await axios.get(
        `https://api.github.com/repos/${owner}/${name}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );
    return data;
};


export async function fetchIssues(owner: string, name: string, pageParam: number) {
    const { data } = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/issues?page=${pageParam}&per_page=${issues_per_page}`,
        {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
    );

    return {
        data: data,
        nextPageParam: data.length < issues_per_page ? undefined : pageParam + 1
    };
};
