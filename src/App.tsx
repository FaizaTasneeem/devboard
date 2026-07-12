import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './App.css'
import Logo from './components/Logo';

type Repository = {
  id: number,
  name: string
}

const token = import.meta.env.VITE_GITHUB_TOKEN;

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { isLoading, isError, data, error } = useQuery<Repository[]>({
    queryKey: ["repo", debouncedQuery],
    queryFn: () => searchRepos(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    // staleTime: 5 * 60 * 1000
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);

  }, [query])

  async function searchRepos(repo: string) {
    console.log(repo);
    // return repodemo;
    const { data } = await axios.get(`https://api.github.com/search/repositories?q=${repo}&sort=stars`,
      {
        headers: {
          'authorization': `Bearer ${token}`
        }
      }
    );
    console.log();
    return data.items;
  }

  if (isError) return (
    <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117] text-red-300'>
      Error occured during fetching: {error.message}
    </div>
  )

  return (
    <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117] '>
      <div className="w-full flex flex-row justify-start gap-4">
        <Logo />
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='w-1/2 text-gray-300 bg-gray-700 p-2 border border-gray-400 rounded-lg' disabled={isLoading} placeholder="🔍 Enter repository names, e.g. react query, owner:vercel..." />
      </div>
      <hr className="w-full h-px my-4 bg-gray-600" />

      <div className="flex flex-col p-4 text-gray-300 ">
        {isLoading && (
          <div className=''>
            Loading...
          </div>
        )}

        {data?.map((item: Repository) => {
          return (
            <div key={item.id} className='text-gray-300 '>
              {item.name}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default App
