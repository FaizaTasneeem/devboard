function RepoSearchPlaceholder() {
    return (
        <div className="mt-14 flex flex-col justify-center items-center font-mono ">
            <div className="p-2 border rounded-xl">🔍</div>
            <span className='pt-4 text-gray-400 font-medium'>Search GitHub repositories</span>
            <span className="text-gray-600 text-sm">try: react query · owner:vercel · language:rust</span>
        </div>

    )
}

export default RepoSearchPlaceholder