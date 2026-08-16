import { Link } from "react-router-dom";

export const Landing = () => {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center">
            <h1 className="text-6xl font-serif font-bold mb-4 tracking-tight">Scriptorio</h1>
            <p className="text-xl text-gray-500 mb-10 max-w-md text-center">
                A minimalist space to read, write, and share your thoughts with the world.
            </p>
            <div className="flex gap-4">
                <Link to="/login">
                    <button className="bg-black text-white hover:bg-white hover:text-black border border-black focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2.5 transition-colors">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="bg-white text-black hover:bg-gray-100 border border-black focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2.5 transition-colors">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    )
}
