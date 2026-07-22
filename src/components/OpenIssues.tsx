import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
// import axios from "axios";

function OpenIssues({ owner, name }: { owner: string, name: string }) {

    const issues = Array.from({ length: 100 }).map((_, idx) => {
        return ({
            id: idx,
            name: `Item ${idx + 1}`
        })
    })
    const issues_per_page = 20;

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['issues', owner, name],
        queryFn: fetchIssues,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPageParam
    });

    const { ref, inView } = useInView();

    async function fetchIssues({ pageParam }: { pageParam: number }) {
        // const { data } = await axios.get(`https://api.github.com/repos/${owner}/${name}/issues?page=${pageParam}&per_page=${issues_per_page}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return {
            data: issues.slice(pageParam, pageParam + issues_per_page),
            nextPageParam: pageParam + issues_per_page < issues.length ? pageParam + issues_per_page : undefined
        }

    }

    useEffect(() => {
        if (inView) fetchNextPage();

    }, [inView, fetchNextPage]);

    return (
        <div className="flex">

            <div className="w-full p-4 my-2 bg-gray-900 border border-gray-600 rounded-lg flex flex-col gap-2">
                {data?.pages.map((page, pageIdx: number) => {
                    return (
                        <div key={pageIdx}>
                            {page.data.map((issue, issueIdx) => {
                                return (
                                    <div key={issueIdx} className={`p-4 flex flex-col text-gray-400 ${issue.id === issues.length - 1 ? '' : 'border-b border-gray-700'} `}>
                                        {issue.name}
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