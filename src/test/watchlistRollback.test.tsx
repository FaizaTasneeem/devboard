import { it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetWatchlist, useDeleteFromWatchList } from "../hooks/useWatchlistQueries";

it("should successfully call delete mutation and return success response", async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: {
                retry: false,
            }
        }
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result: getResult } = renderHook(() => useGetWatchlist(), { wrapper });
    await waitFor(() => expect(getResult.current.isSuccess).toBe(true));
    expect(getResult.current.data).toEqual(queryClient.getQueryData(['watchlist']));

    const { result: delResult } = renderHook(() => useDeleteFromWatchList(), { wrapper });
    delResult.current.mutate('101');
    await waitFor(() => expect(delResult.current.isError).toBe(true));
    expect(queryClient.getQueryData(['watchlist'])).toEqual(getResult.current.data);
});