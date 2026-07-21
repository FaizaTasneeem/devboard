import { useInfiniteQuery } from "@tanstack/react-query";

function OpenIssues({ owner, name }) {
    const { data } = useInfiniteQuery({
        queryKey: ['issues', owner, name],
        queryFn: fetchIssues,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
    });

    async function fetchIssues({ pageParam }: { pageParam: number }) {
        return {
            nextPage: pageParam + 1
        }

    }

    return (
        <div className="flex">

            <div className="w-full p-4 my-2 bg-gray-900 border border-gray-600 rounded-lg flex flex-col gap-2">

            </div>
        </div>
    )
}

export default OpenIssues