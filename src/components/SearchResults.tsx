import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoStar, GoRepoForked, GoIssueOpened } from "react-icons/go";
import type { Repository } from "../types";

function SearchResults({ items }: { items: Repository[] }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const { data } = useQuery({
        queryKey: ['watchlist'],
        queryFn: fetchWatchList
    });

    async function fetchWatchList() {
        const { data } = await axios.get(`http://localhost:4000/watchlist`);
        return data;
    }


    const { mutateAsync } = useMutation({
        mutationFn: addToWatchList,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] })
    });

    async function addToWatchList(item: Repository) {
        const watchedRepo = data?.find((watchItem: Repository) => watchItem.full_name === item.full_name)
        if (watchedRepo) {
            await deleteFromWatchList(watchedRepo.id);
            return;
        }

        const res = await axios.post(`http://localhost:4000/watchlist`, item);
        return res;
    }

    async function deleteFromWatchList(id: string) {
        const { data } = await axios.delete(`http://localhost:4000/watchlist/${id}`);
        return data;
    }


    function handleRepoClick(event: React.MouseEvent<HTMLDivElement>, item: Repository) {
        const target = event.target as HTMLElement;
        const starButton = target.closest(".star-btn");
        if (!starButton) {
            navigate(`repo/${item.owner.login}/${item.name}`);
        }
    }


    return (
        <div className="flex flex-col justify-start items-start">
            {items?.map((item: Repository) => {
                return (
                    <div key={item.id} className='w-full p-4 my-2 bg-gray-900 border border-gray-600 hover:border-blue-600 hover:cursor-pointer rounded-lg flex gap-4 relative' onClick={(event) => handleRepoClick(event, item)}>
                        <div className="w-8 h-8 rounded-full border border-gray-600 overflow-hidden">
                            <img src={item.owner.avatar_url} alt="avatar" />
                        </div>

                        <div className="w-[95%] flex flex-col">
                            <div className="text-blue-400 text-base font-mono font-medium">{item.name}</div>

                            <div className="text-gray-400 text-sm font-sans font-normal">{item.description || "N/A"}</div>

                            <div className="flex flex-row gap-4 text-gray-500 text-xs font-sans font-normal p-2">
                                <span className="flex items-center gap-1">
                                    <GoStar className="w-3.5 h-3.5" />
                                    {item.stargazers_count.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GoRepoForked className="w-3.5 h-3.5" />
                                    {item.forks_count.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GoIssueOpened className="w-3.5 h-3.5" />
                                    {item.open_issues_count.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                                    {item.language || "N/A"}
                                </span>
                            </div>

                            <div className="mt-2 flex flex-row flex-wrap gap-2 text-blue-400 text-xs font-mono font-normal">
                                {item.topics?.slice(0, 5).map((topic, id) => {
                                    return (
                                        <div key={id} className="bg-blue-950 rounded-lg border border-blue-900 p-1">
                                            {topic}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>

                        <div
                            className={`star-btn top-2 right-2 w-8 h-8 p-2 border rounded-sm cursor-pointer flex justify-center hover:border-yellow-500 hover:text-yellow-500 absolute ${data?.find(watchedItem => watchedItem.full_name === item.full_name) ? 'border-yellow-500 text-yellow-500' : 'border-gray-600 '}`}
                            onClick={() => mutateAsync(item)}
                        >
                            <GoStar className={`w-3.5 h-3.5`} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults