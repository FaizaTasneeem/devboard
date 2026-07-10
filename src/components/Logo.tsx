
function Logo() {
    return (
        <div className="flex justify-center items-center gap-2 text-white">
            <div className="p-1.5 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white"
                >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                </svg>
            </div>
            <span className="font-bold">DevBoard</span>
        </div>
    )
}

export default Logo