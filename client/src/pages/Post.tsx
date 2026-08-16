import { useState } from 'react';
import { Avatar } from '../components/BlogCard';
import { Button } from '../components/Button';
import { usePublish } from '../hooks';
import toast from 'react-hot-toast';

export const Post = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { publishBlog, loading } = usePublish();

  const handlePublish = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error('Please add a title and story before publishing.');
      return;
    }

    const result = await publishBlog({ title, description });
    if (result) {
        toast.success('Blog Successfully Posted');
    } else {
        toast.error('Failed');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            <div className="w-6 h-6 bg-black rounded-full"></div>
            <div className="w-4 h-6 bg-black rounded-full"></div>
            <div className="w-1 h-6 bg-black rounded-full"></div>
          </div>
          <span className="font-medium text-[15px]">Draft in Kirags</span>
          <span className="text-sm text-gray-400">Saved</span>
        </div>

        <div className="flex items-center gap-5">
          <Button label={loading ? 'Publishing...' : 'Publish'} onClick={handlePublish} />
          <Avatar name='Teja' size={10} />
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-16 px-4 flex gap-4">
        <div className="flex gap-4 pt-2.5">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:border-gray-800 hover:text-gray-800 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          <div className="w-[1px] h-10 bg-gray-300"></div>
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-[42px] font-serif text-gray-800 placeholder-gray-300 outline-none bg-transparent mb-2"
          />
          <textarea
            placeholder="Tell your story..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-[21px] font-serif text-gray-800 placeholder-gray-300 outline-none bg-transparent resize-none h-[60vh] mt-2"
          ></textarea>
        </div>
      </main>
    </div>
  );
};