import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWatchList, addToWatchList, editWatchlist, deleteFromWatchList, getFormattedData } from "../services/watchlistApi";
import type { WatchlistType } from "../types";


export const useGetWatchlist = () => {
    return useQuery({
        queryKey: ['watchlist'],
        queryFn: fetchWatchList
    });
};

export const useAddToWatchlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWatchList,
        onMutate: async (repo) => {
            await queryClient.cancelQueries({ queryKey: ['watchlist'] });

            const previous: WatchlistType[] | undefined = queryClient.getQueryData(['watchlist']);

            const isWatched = previous?.some((watchItem) => watchItem.fullName === repo.item.full_name);

            queryClient.setQueryData(['watchlist'],
                isWatched
                    ? previous?.filter((item) => item.fullName !== repo.item.full_name)
                    : previous && [...previous, getFormattedData(repo.item)]
            )

            return { previous };
        },
        onError: (_err, _repo, ctx) => queryClient.setQueryData(['watchlist'], ctx?.previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    });
};

export const useEditWatchlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editWatchlist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    });

};

export const useDeleteFromWatchList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFromWatchList,
        onMutate: async (repoId) => {
            await queryClient.cancelQueries({ queryKey: ['watchlist'] });
            const previous: WatchlistType[] | undefined = queryClient.getQueryData(['watchlist']);
            queryClient.setQueryData(['watchlist'],
                previous?.filter(watchItem => watchItem.id !== repoId)
            )
            return { previous }
        },
        onError: (_err, _repoId, ctx) => queryClient.setQueryData(['watchlist'], ctx?.previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    });
};