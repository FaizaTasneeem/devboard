import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchRepos, searchRepoDetails } from '../api/axios';

export const useGetRepos = (query: string) => {
    return useInfiniteQuery({
        queryKey: ["repo", query],
        queryFn: ({ pageParam }: { pageParam: number }) => fetchRepos(query, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPageParam,
        enabled: query.length > 0
    });
};

export const useGetRepoDetails = (owner: string, name: string) => {
    return useQuery({
        queryKey: ['repo', owner, name],
        queryFn: () => searchRepoDetails(owner, name),
    });
};