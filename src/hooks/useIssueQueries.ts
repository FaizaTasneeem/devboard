import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchIssues } from "../api/axios";

export const useGetIssues = (owner: string, name: string) => {
    return useInfiniteQuery({
        queryKey: ['issues', owner, name],
        queryFn: ({ pageParam }: { pageParam: number }) => fetchIssues(owner, name, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPageParam
    });
};