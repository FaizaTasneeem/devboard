import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GoStar } from "react-icons/go";
import type { Repository } from "../types";

function Watchlist() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['watchlist'],
        queryFn: fetchWatchList

    });


    async function fetchWatchList() {
        const { data } = await axios.get(`http://localhost:4000/watchlist`);
        console.log(data);
        return data;
    }


    return (
        <div className="flex flex-col bg-[#131927] rounded-lg border border-[#212b3e] font-mono text-sm text-slate-400">
            <div className="p-2 w-80 flex gap-10 justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-white">⭐ Watchlist</span>
                </div>
                {data && <span className="">{data.length} repos</span>}
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
                    <GoStar className="w-5 h-5 yellow" />
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
                        <div key={idx} className={`p-2 px-4 flex flex-col ${idx === data.length - 1 ? '' : 'border-b border-gray-700'}`}>
                            <span className="text-blue-400 ">
                                {item.name}
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
                            <input type="text" className="mt-4 p-2 rounded-lg" placeholder="add a note..." />
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default Watchlist