import { BlogCard } from "../components/BlogCard"
import { NavBar } from "../components/NavBar"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return (
            <div className="max-w-full animate-pulse">
                <div
                    className="block w-56 h-3 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
                    &nbsp;
                </div>
                <div
                    className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
                    &nbsp;
                </div>
                <div
                    className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
                    &nbsp;
                </div>
                <div
                    className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
                    &nbsp;
                </div>
                <div
                    className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-72">
                    &nbsp;
                </div>
                </div>
        )
    }
    return (
        <main>
            <NavBar />
            {blogs.map((blog) => (
                <BlogCard
                key={blog.id}
                id={blog.id}
                author={blog.user.email}
                title={blog.title}
                description={blog.description}
                publishedDate="09-07-2005"
                />
            ))}
        </main>
    )
}