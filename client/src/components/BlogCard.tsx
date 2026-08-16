import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string
    author: string
    publishedDate: string
    title: string
    description: string
}


export const BlogCard = ({
    id,
    author,
    publishedDate,
    title,
    description
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} className="block border-b border-slate-200 pb-8 pt-8 pl-50 cursor-pointer group no-underline">
            <article>
                <div className="flex items-center gap-2 mb-3">
                    <Avatar name={author} />

                    <span className="text-sm font-medium text-neutral-900">
                        {author}
                    </span>

                    <span className="text-sm text-neutral-400">·</span>

                    <span className="text-sm text-neutral-500">{publishedDate}</span>
                </div>

                <h2 className="text-xl font-extrabold leading-snug text-neutral-900 tracking-tight group-hover:underline decoration-1 underline-offset-2">
                    {title}
                </h2>

                <p className="mt-1 text-base leading-relaxed text-neutral-500 line-clamp-2">
                    {description.length > 150
                        ? description.slice(0, 150) + "..."
                        : description}
                </p>

                <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-medium text-neutral-400">
                        {estimateReadingTime(description)}
                    </span>
                </div>
            </article>
        </Link>
    )
}

interface AvatarProps {
    name: string
    avatar?: string
    size?: number
}

export function Avatar({ name, avatar, size = 6 }: AvatarProps) {
    return (
        <div
            className="relative inline-flex items-center justify-center overflow-hidden bg-neutral-800 text-white rounded-full"
            style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
        >
            {avatar ? (
                <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="text-xs font-semibold">
                    {name[0].toUpperCase()}
                </span>
            )}
        </div>
    )
}

const estimateReadingTime = (text: string): string => {

    const avgCharsPerWord = 5;
    const avgWordsPerMinute = 225;
    const charsPerMinute = avgWordsPerMinute * avgCharsPerWord;
    const charsInText = text.length;
    

    if (charsInText < 200) {
        return "1 minute read";
    }
    
    const readingTimeMinutes = charsInText / charsPerMinute;
    return `${Math.round(readingTimeMinutes)} minutes read`;
};