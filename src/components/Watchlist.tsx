import { useState } from "react";
import { GoStar } from "react-icons/go";
import type { Repository } from "../types";
import WatchlistItemNote from "./WatchlistItemNote";
import { useDeleteFromWatchList, useGetWatchlist } from "../hooks/useWatchlistQueries";

function Watchlist() {
    const [showCrossButton, setShowCrossButton] = useState(-1);

    const { isLoading, isError, data, error } = useGetWatchlist();

    const { mutateAsync } = useDeleteFromWatchList();

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