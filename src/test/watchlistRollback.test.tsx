import { it, expect } from 'vitest';
import { renderHook, waitFor, render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetWatchlist, useDeleteFromWatchList } from "../hooks/useWatchlistQueries";
import Watchlist from '../components/Watchlist';

it("should optimistically remove item from cache and roll back when delete mutation fails", async () => {
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
    await waitFor(() => expect(queryClient.getQueryData(['watchlist'])).toEqual([]));
    await waitFor(() => expect(delResult.current.isError).toBe(true));
    expect(queryClient.getQueryData(['watchlist'])).toEqual(getResult.current.data);
});


it("should optimistically remove item from UI and restore it when deletion fails", async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            mutations: {
                retry: false,
            }
        }
    });

    render(
        <QueryClientProvider client={queryClient}>
            <Watchlist />
        </QueryClientProvider>
    )

    const repoElement = await screen.findByText('react');
    fireEvent.mouseEnter(repoElement);
    const crossBtn = await screen.findByText('x');
    fireEvent.click(crossBtn);

    await waitFor(() => expect(repoElement).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText('react')).toBeInTheDocument());
});