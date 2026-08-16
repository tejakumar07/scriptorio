type FullBlogProps = {
    blog: {
        id: string;
        title: string;
        description: string;
        user: {
            email: string;
        };
    };
};

export const FullBlog = ({ blog }: FullBlogProps) => {
    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">

                
                <article>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="mt-4 text-sm text-slate-500">
                        Posted on July 09, 2026
                    </div>

                    <div className="mt-10 text-lg leading-8 text-slate-700 whitespace-pre-line">
                        {blog.description}
                    </div>
                </article>

                
                <aside className="lg:pt-2">
                    <p className="text-sm text-slate-500 mb-3">
                        Author
                    </p>

                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                            {blog.user.email.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <p className="font-semibold text-slate-900">
                                {blog.user.email.split("@")[0]}
                            </p>

                            <p className="mt-1 text-sm text-slate-500 leading-5">
                                Master of words, writer, and creator.
                            </p>
                        </div>
                    </div>
                </aside>

            </div>
        </main>
    );
};