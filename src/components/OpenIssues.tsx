import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

function OpenIssues({ owner, name }) {
    const { data } = useInfiniteQuery({
        queryKey: ['issues', owner, name],
        queryFn: fetchIssues,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined
    });

    async function fetchIssues({ pageParam }: { pageParam: number }) {
        const { data } = await axios.get(`https://api.github.com/repos/${owner}/${name}/issues`)
        return {
            data: data,
            nextPage: pageParam + 1
        }

    }

    return (
        <div className="flex">

            <div className="w-full p-4 my-2 bg-gray-900 border border-gray-600 rounded-lg flex flex-col gap-2">
                {/* {data.map((page) => {

                })} */}

            </div>
        </div>
    )
}

export default OpenIssues