import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useBlog({ id });

    if (!id) {
        return <div>Invalid blog ID</div>;
    }

    if (loading) {
        return (
            <div className="max-w-full animate-pulse">
                <div className="block w-56 h-3 mb-4 bg-gray-300 rounded-full">
                    &nbsp;
                </div>

                <div className="block w-72 h-2 mb-2 bg-gray-300 rounded-full">
                    &nbsp;
                </div>

                <div className="block w-72 h-2 mb-2 bg-gray-300 rounded-full">
                    &nbsp;
                </div>

                <div className="block w-72 h-2 mb-2 bg-gray-300 rounded-full">
                    &nbsp;
                </div>

                <div className="block w-72 h-2 mb-2 bg-gray-300 rounded-full">
                    &nbsp;
                </div>
            </div>
        );
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return <FullBlog blog={blog} />;
};