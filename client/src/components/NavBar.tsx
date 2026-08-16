import { useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { Button } from "./Button"
import toast from "react-hot-toast"

export const NavBar = () => {
    const navigate = useNavigate()
    
    const logoutHandle = () => {
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        navigate("/login")
    }

    return (
        <main className="flex justify-between items-center shadow-lg p-2">
            <div className="text-3xl font-serif font-bold cursor-pointer" onClick={() => navigate('/')}>
                Scriptorio
            </div>
            <div className="flex items-center gap-4">
                <Avatar name="Teja" size={10} />
                <div className="w-24">
                    <Button label="Logout" onClick={logoutHandle} />
                </div>
            </div>
        </main>
    )
}