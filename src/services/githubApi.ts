import axios from "axios";

const repos_per_page = 20;
const issues_per_page = 20;
const server = import.meta.env.VITE_BACKEND_SERVER_LESSON || 'http://localhost:5000/api';


export async function fetchRepos(query: string, pageParam: number) {
    const { data } = await axios.get(
        `${server}/repos`,
        {
            params: {
                query,
                pageParam,
                repos_per_page
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
        `${server}/repoDetails`,
        {
            params: {
                owner,
                name
            }
        }
    );
    return data;
};


export async function fetchIssues(owner: string, name: string, pageParam: number) {
    const { data } = await axios.get(
        `${server}/issues`,
        {
            params: {
                owner,
                name,
                pageParam,
                issues_per_page
            }
        }
    );

    return {
        data: data,
        nextPageParam: data.length < issues_per_page ? undefined : pageParam + 1
    };
};
