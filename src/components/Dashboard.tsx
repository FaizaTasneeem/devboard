import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import Logo from './Logo';
import RepoSearchPlaceholder from './RepoSearchPlaceholder';
import NoResultsFound from './NoResultsFound';
import SearchResults from './SearchResults';
import Watchlist from './Watchlist';

const token = import.meta.env.VITE_GITHUB_TOKEN;

function Dashboard() {
    const repos_per_page = 20;

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [inputVal, setInputVal] = useState(query);
    const [prevQuery, setPrevQuery] = useState(query);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
        queryKey: ["repo", query],
        queryFn: fetchRepos,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPageParam,
        enabled: query.length > 0
    });

    const { ref, inView } = useInView();

    async function fetchRepos({ pageParam }: { pageParam: number }) {
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
    }


    if (query !== prevQuery) {
        setPrevQuery(query);
        setInputVal(query);
    }


    useEffect(() => {
        if (inputVal === query) return;

        const timer = setTimeout(() => {
            setSearchParams({ q: inputVal });
        }, 500);

        return () => clearTimeout(timer);

    }, [inputVal]);


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView])


    return (
        <div className='w-full min-h-screen p-10 flex flex-col bg-[#0d1117]'>
            <div className="w-full flex flex-row md:justify-center gap-8">
                <Logo />
                <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} className='w-2/3 p-2 text-[#d1d5db] bg-[#131927] border border-[#212b3e] rounded-full font-mono placeholder-[#3e4c6e]' disabled={isLoading} placeholder="🔍 Enter repository names, e.g. react query, owner:vercel..." />
            </div>
            <hr className="w-full h-px my-4 bg-gray-600" />

            <div className="w-full px-32 flex justify-center items-start gap-2">
                <div className="w-2/3 flex flex-col p-4 text-gray-300 ">
                    {isLoading && <div className="p-4 text-gray-400">Loading...</div>}

                    {isError && (
                        <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117] text-red-300'>
                            Error occured during fetching: {error.message}
                        </div>
                    )}

                    {query.length === 0 &&
                        <RepoSearchPlaceholder />
                    }

                    {!isLoading && data && data.pages[0].items.length === 0 &&
                        <NoResultsFound />
                    }

                    {data?.pages[0]?.total_count > 0 && <span className="text-gray-500 font-small mb-4">
                        {data?.pages[0].total_count.toLocaleString()} results . sorted by ⭐
                    </span>}

                    {data?.pages.map((page, pageIdx) => (
                        <div key={pageIdx}>
                            <SearchResults items={page.items} />
                        </div>
                    ))}

                    <div ref={ref}>
                        {isFetchingNextPage && <div className="p-4 text-gray-400">Loading...</div>}
                    </div>
                </div>

                <Watchlist />

            </div>

        </div>
    )
}

export default Dashboard
