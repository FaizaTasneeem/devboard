import { useState, useEffect } from 'react'
import './App.css'
import Logo from './components/Logo';

type Repository = {
  id: number,
  name: string
}

function App() {
  const [repo, setRepo] = useState("");
  const [data, setData] = useState<Repository[]>([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetch(`https://api.github.com/search/repositories?q=${repo}&per_page=100`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
          return res.json();
        })
        .then(data => setData(data.items))
        .catch(error => console.log('Fetch error: ', error))

    }, 500);

    return () => clearTimeout(timerId);
  }, [repo]);

  return (
    <div className='min-h-screen p-10 flex flex-col justify-start items-start bg-[#0d1117]'>
      <div className="w-full flex flex-row justify-start gap-4">
        <Logo />

        <input type="text" value={repo} onChange={(e) => setRepo(e.target.value)} className='w-1/2 bg-gray-700 p-2 border border-gray-400 rounded-lg' placeholder="🔍 Enter repository names, e.g. react query, owner:vercel..." />

      </div>

      <hr className="w-full h-px my-4 bg-gray-600" />
      <div className="flex flex-col p-4">

        {data.map(item => {
          return (
            <div key={item.id} className='text-white'>
              {item.name}
            </div>
          )
        })}

      </div>
    </div>
  )
}

export default App
