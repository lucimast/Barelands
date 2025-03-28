"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'sonner';
import { type BlogPost } from '@/lib/data';

export default function BlogPostsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/blogposts');
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setBlogPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blog posts');
      console.error('Error fetching blog posts:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      toast.success('Blog post deleted successfully');
      fetchBlogPosts(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog post');
      console.error('Error deleting blog post:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={fetchBlogPosts}
            className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>
          
          <Link
            href="/admin/dashboard/blog/new"
            className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm flex items-center"
          >
            <FiPlus className="mr-2" />
            New Post
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <FiRefreshCw className="animate-spin h-8 w-8 text-white" />
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-900 rounded-md p-4 text-red-200">
          <p className="font-medium">Error: {error}</p>
          <button
            onClick={fetchBlogPosts}
            className="mt-2 px-3 py-1 bg-red-900/50 hover:bg-red-900/70 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="bg-zinc-800 rounded-md p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No Blog Posts Yet</h3>
          <p className="text-zinc-400 mb-4">Create your first blog post to share your photography stories.</p>
          <Link
            href="/admin/dashboard/blog/new"
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded inline-flex items-center"
          >
            <FiPlus className="mr-2" />
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-300 border-b border-zinc-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-300 border-b border-zinc-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-zinc-300 border-b border-zinc-700">
                  Author
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-zinc-300 border-b border-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                      )}
                      <div>
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-xs text-zinc-400 truncate max-w-xs">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    {post.author}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/blog/${post.id}`}
                        target="_blank"
                        className="p-1.5 bg-blue-900/30 text-blue-300 rounded hover:bg-blue-900/50"
                        title="View"
                      >
                        <FiEye size={16} />
                      </Link>
                      <Link
                        href={`/admin/dashboard/blog/edit/${post.id}`}
                        className="p-1.5 bg-amber-900/30 text-amber-300 rounded hover:bg-amber-900/50"
                        title="Edit"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 bg-red-900/30 text-red-300 rounded hover:bg-red-900/50"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 