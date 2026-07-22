import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GoTag, GoRepoForked, GoEye, GoStar, GoLinkExternal } from "react-icons/go";
import { IoAlertCircleOutline } from "react-icons/io5";
import type { Repository } from "../types";
import Logo from "./Logo";
import OpenIssues from "./OpenIssues";

const token = import.meta.env.VITE_GITHUB_TOKEN;

function RepoDetails() {
    const { owner = "", name = "" } = useParams<{ owner: string, name: string }>();

    const { isLoading, isError, data, error } = useQuery<Repository>({
        queryKey: ['repo', owner, name],
        queryFn: () => searchRepoDetails(owner, name),
    })

    async function searchRepoDetails(owner: string, name: string) {
        const { data } = await axios.get(
            `https://api.github.com/repos/${owner}/${name}`,
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }
        );
        return data;
    }

    return (
        <div className="min-h-screen p-10 flex flex-col bg-[#0d1117]">
            <div className="flex flex-col items-start">
                <Logo />
                <hr className="w-full h-px my-4 bg-gray-600" />
            </div>

            {isLoading && (
                <div className='text-gray-300'>
                    Loading...
                </div>
            )}

            {isError && (
                <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117] text-red-300'>
                    Error occured during fetching repository details: {error.message}
                </div>
            )}

            {data && <div className='w-full p-4 my-2 bg-gray-900 border border-gray-600 rounded-lg flex gap-4 '>
                <div className="w-10 h-10 rounded-lg border border-gray-600 overflow-hidden">
                    <img src={data.owner.avatar_url} alt="avatar" />
                </div>

                <div className="w-[95%] flex flex-col">
                    <div className="w-full flex text-base font-mono font-medium pl-1 justify-between">
                        <span className="text-gray-400">{owner}/
                            <span className="text-white">{name}</span>
                        </span>


                        <div className="flex gap-2">
                            <button className="p-2 py-1 font-medium border border-gray-500 text-gray-500 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                                <GoStar className="w-3.5 h-3.5" />
                                <span className="">Watch</span>
                            </button>

                            <button className="p-2 py-1 font-medium border border-gray-500 text-gray-500 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                                <GoLinkExternal className="w-3.5 h-3.5" />
                                <span className="">GitHub</span>
                            </button>
                        </div>
                    </div>

                    <div className="text-gray-400 text-sm font-sans font-normal pl-1">{data.description}</div>

                    <div className="flex flex-row gap-4 text-gray-500 text-xs font-sans font-normal p-2 pl-1 mt-2">
                        <span className="flex datas-center gap-1">
                            <GoStar className="w-3.5 h-3.5 text-yellow-500" />
                            <div className="text-white font-medium">{data.stargazers_count.toLocaleString()} <span className="pl-1 text-gray-400">stars</span></div>
                        </span>
                        <span className="flex datas-center gap-1">
                            <GoRepoForked className="w-3.5 h-3.5" />
                            <div className="text-white font-medium">{data.forks_count.toLocaleString()} <span className="pl-1 text-gray-400">forks</span></div>
                        </span>
                        <span className="flex datas-center gap-1">
                            <GoEye className="w-3.5 h-3.5" />
                            <div className="text-white font-medium">{data.watchers_count.toLocaleString()} <span className="pl-1 text-gray-400">watchers</span></div>
                        </span>
                        <span className="flex datas-center gap-1">
                            <IoAlertCircleOutline className="w-3.5 h-3.5" />
                            <div className="text-white font-medium">{data.open_issues_count.toLocaleString()} <span className="pl-1 text-gray-400">issues</span></div>
                        </span>
                        <span className="flex datas-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                            {data.language || "N/A"}
                        </span>
                        <span className="flex datas-center gap-1">
                            <GoTag className="w-3.5 h-3.5" />
                            {data.license?.spdx_id || "N/A"}
                        </span>
                    </div>

                    <div className="mt-2 flex flex-row flex-wrap gap-2 text-blue-400 text-xs font-mono font-normal">
                        {data.topics.map((topic, id) => {
                            return (
                                <div key={id} className="bg-blue-950 rounded-xl border border-blue-900 px-2 py-1">
                                    {topic}
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>}

            {data &&
                <>
                    <h2 className="mt-6 mb-2 text-white">Open Issues <span className="text-gray-600">({data.open_issues_count} total)</span></h2>
                    <OpenIssues owner={owner} name={name} />
                </>
            }


        </div>
    )
}

export default RepoDetails
