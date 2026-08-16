import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

interface Blog {
    id: string;
    title: string;
    description: string;
    user: {
        email: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
                    headers: {
                        Authorization: token
                    }
                });
                setBlogs(response.data.metaData);
            }
            catch(e) {
                toast.error("Failed");
            }
            finally {
                setLoading(false)
            }
        }
        fetchBlogs();
    }, [])

    return {
        loading, 
        blogs
    };
}

export const useBlog = ({ id }: { id?: string }) => {
    const [loading, setLoading] = useState(Boolean(id));
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            setBlog(null);
            return;
        }

        const fetchBlog = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${BACKEND_URL}api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

                setBlog(response.data.metaData);
            } catch (e) {
                setBlog(null);
                toast.error("Failed");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return {
        loading,
        blog
    };
};

interface PublishProps {
    title: string;
    description: string;
}

export const usePublish = () => {
    const [loading, setLoading] = useState(false);
    const [publish, setPublish] = useState<PublishProps | null>(null);

    const publishBlog = async ({ title, description }: PublishProps) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${BACKEND_URL}api/v1/blog/create`,
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setPublish(response.data);
            return response.data;
        } catch (e) {
            toast.error("Failed");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        publishBlog,
        publish,
        loading
    };
};