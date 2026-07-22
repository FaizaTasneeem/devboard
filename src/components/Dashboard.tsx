import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Logo from './Logo';
import RepoSearchPlaceholder from './RepoSearchPlaceholder';
import NoResultsFound from './NoResultsFound';
import SearchResults from './SearchResults';
import type { Repository } from '../types';

const token = import.meta.env.VITE_GITHUB_TOKEN;

function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [inputVal, setInputVal] = useState(query);
    const [prevQuery, setPrevQuery] = useState(query);

    const { isLoading, isError, data, error } = useQuery<{ total_count: number, items: Repository[] }>({
        queryKey: ["repo", query],
        queryFn: () => searchRepos(query),
        enabled: query.length > 0,
        // staleTime: 5 * 60 * 1000
    });


    async function searchRepos(repo: string) {
        const { data } = await axios.get(`https://api.github.com/search/repositories?q=${repo}&sort=stars`,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
        );
        return { total_count: data.total_count, items: data.items };
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


    return (
        <div className='min-h-screen p-10 flex flex-col bg-[#0d1117]'>
            <div className="w-full flex flex-row justify-start gap-4">
                <Logo />
                <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} className='w-1/2 text-gray-300 bg-gray-700 p-2 border border-gray-400 rounded-lg' disabled={isLoading} placeholder="🔍 Enter repository names, e.g. react query, owner:vercel..." />
            </div>
            <hr className="w-full h-px my-4 bg-gray-600" />

            <div className="flex flex-col p-4 text-gray-300 ">
                {isLoading && (
                    <div className=''>
                        Loading...
                    </div>
                )}

                {isError && (
                    <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117] text-red-300'>
                        Error occured during fetching: {error.message}
                    </div>
                )}

                {query.length === 0 &&
                    <RepoSearchPlaceholder />
                }

                {!isLoading && data && data.items.length === 0 &&
                    <NoResultsFound />
                }

                {data && data.items.length !== 0 && <SearchResults total_count={data.total_count} items={data.items} />}

            </div>
        </div>
    )
}

export default Dashboard
