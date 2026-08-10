import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GoStar } from "react-icons/go";
import type { Repository } from "../types";
import WatchlistItemNote from "./WatchlistItemNote";
import { fetchWatchList, deleteFromWatchList } from "../api/axios";

function Watchlist() {
    const queryClient = useQueryClient();

    const [showCrossButton, setShowCrossButton] = useState(-1);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['watchlist'],
        queryFn: fetchWatchList
    });

    const { mutateAsync } = useMutation({
        mutationFn: deleteFromWatchList,
        onMutate: async (repoId) => {
            await queryClient.cancelQueries({ queryKey: ['watchlist'] });
            const previous: Repository[] | undefined = queryClient.getQueryData(['watchlist']);
            queryClient.setQueryData(['watchlist'],
                previous?.filter(watchItem => watchItem.id !== repoId)
            )
            return { previous }
        },
        onError: (err, repoId, ctx) => queryClient.setQueryData(['watchlist'], ctx?.previous),
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    })

    function handleWatchItemClick(url: string) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }


    return (
        <div className="flex flex-col bg-[#131927] rounded-lg border border-[#212b3e] font-mono text-sm text-slate-400">
            <div className="p-2 w-76 flex gap-10 justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-white">⭐ Watchlist</span>
                </div>
                {data && <span className="">{data.length} repo(s)</span>}
            </div>
            <hr className="bg-[#212b3e]" />

            {isError &&
                <div>
                    Error fetching watchlist: {error.message}
                </div>
            }

            {isLoading &&
                <div>
                    Loading...
                </div>
            }

            {data && data.length === 0 &&
                <div className="py-8 flex flex-col gap-2 justify-center items-center">
                    <GoStar className="w-5 h-5" />
                    <div className="">
                        No repos watched yet.
                    </div>
                    <div className="">
                        Hit ★ on any result.
                    </div>
                </div>
            }

            {data && data.length !== 0 &&
                <div>
                    {data.map((item: Repository, idx: number) => (
                        <div
                            key={item.id}
                            className={`p-2 px-4 flex flex-col cursor-pointer ${idx === data.length - 1 ? '' : 'border-b border-gray-700'}`}
                            onMouseEnter={() => setShowCrossButton(idx)}
                            onMouseLeave={() => setShowCrossButton(-1)}
                            onClick={() => handleWatchItemClick(item.html_url)}
                        >
                            <span className="flex justify-between text-blue-400 ">
                                {item.name}
                                {showCrossButton === idx &&
                                    <button
                                        className="text-gray-600 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            mutateAsync(item.id);
                                        }}
                                    >x</button>
                                }
                            </span>
                            <div className="flex gap-2 text-gray-600">
                                <span className="flex gap-1 items-center">
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                                    {item.language}
                                </span>
                                <span className="flex gap-1 items-center">
                                    <GoStar className="w-2.5 h-2.5" />
                                    {item.stargazers_count.toLocaleString()}
                                </span>

                            </div>
                            <WatchlistItemNote item={item} />

                        </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default Watchlist