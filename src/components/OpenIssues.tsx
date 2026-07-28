import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { IoAlertCircleOutline } from "react-icons/io5";
import { GoComment, GoLinkExternal } from "react-icons/go";
import type { Issue } from "../types";

const token = import.meta.env.VITE_GITHUB_TOKEN;

function OpenIssues({ owner, name }: { owner: string, name: string }) {
    const [showIssueHoverEffect, setShowIssueHoverEffect] = useState(-1);

    const issues_per_page = 20;

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['issues', owner, name],
        queryFn: fetchIssues,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPageParam
    });

    const { ref, inView } = useInView();

    async function fetchIssues({ pageParam }: { pageParam: number }) {
        const { data } = await axios.get(
            `https://api.github.com/repos/${owner}/${name}/issues?page=${pageParam}&per_page=${issues_per_page}`,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
        );

        return {
            data: data,
            nextPageParam: data.length < issues_per_page ? undefined : pageParam + 1
        }

    }

    function handleIssueClick(url: string) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();

    }, [inView, fetchNextPage]);

    return (
        <div className="flex">

            <div className="w-full my-2 bg-gray-900 border border-gray-600 rounded-lg flex flex-col">
                {data?.pages.map((page, pageIdx: number) => {
                    return (
                        <div key={pageIdx}>
                            {page.data.map((issue: Issue, issueIdx: number) => {
                                return (
                                    <div
                                        key={issue.id}
                                        className={`group/issue p-4 flex gap-2 text-gray-400 hover:bg-gray-800 hover:rounded-lg hover:cursor-pointer ${issueIdx === page.data.length - 1 ? '' : 'border-b'} ${issueIdx === 0 && pageIdx !== 0 ? 'border-t ' : ''} border-gray-700`}
                                        onMouseEnter={() => setShowIssueHoverEffect(issue.id)}
                                        onMouseLeave={() => setShowIssueHoverEffect(0)}
                                        onClick={() => handleIssueClick(issue.html_url)}
                                    >
                                        <IoAlertCircleOutline className="mt-1 w-5 h-5 text-green-500" />
                                        <div className="w-full flex flex-col text-gray-200">
                                            <div className="flex justify-between">
                                                <div className="flex gap-2 font-medium ">
                                                    <span className="group-hover/issue:text-blue-600">
                                                        {issue.title}
                                                    </span>
                                                    {issue.labels?.map((label) => (
                                                        <div key={label.id} style={{ backgroundColor: `#${label.color}20`, borderColor: `#${label.color}40`, color: `#${label.color}` }} className="w-20 h-6 px-1 py-0.5 text-xs border rounded-sm bg-red-600 truncate">
                                                            {label.name}
                                                        </div>
                                                    ))}
                                                </div>

                                                {showIssueHoverEffect === issue.id && <GoLinkExternal className="w-3.5 h-3.5" />}
                                            </div>

                                            <div className="mt-2 flex gap-4 text-gray-400 text-sm font-mono">
                                                <span>#{issue.number}</span>
                                                <span>{`opened ${issue.created_at} ago by ${issue.user.login}`}</span>
                                                <span className="flex items-center gap-2">
                                                    <GoComment className="w-4 h-4" />
                                                    {issue.comments}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )

                })}

                <div ref={ref}>
                    {isFetchingNextPage && <div className="p-4 text-gray-400">Loading...</div>}
                </div>

            </div>
        </div>
    )
}

export default OpenIssues