"use client";

import { useState, useEffect } from 'react';
import { type Photo, type BlogPost } from '@/lib/data';
import { toast } from 'sonner';
import { CldUploadWidget } from 'next-cloudinary';
import { FiImage, FiX, FiSave, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface BlogPostFormProps {
  initialData?: BlogPost;
  onSubmit: (data: Partial<BlogPost>) => Promise<void>;
  isLoading: boolean;
  photos: Photo[];
}

export default function BlogPostForm({ 
  initialData, 
  onSubmit, 
  isLoading,
  photos
}: BlogPostFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Barelands',
    relatedPhotoId: undefined,
    date: new Date().toISOString().split('T')[0],
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [markdownPreview, setMarkdownPreview] = useState(false);
  
  // Initialize form data if editing an existing post
  useEffect(() => {
    if (initialData) {
      // Format the date to YYYY-MM-DD for input[type=date]
      const formattedDate = initialData.date 
        ? new Date(initialData.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      setFormData({
        ...initialData,
        date: formattedDate
      });
      
      if (initialData.coverImage) {
        setPreviewImage(initialData.coverImage);
      }
    }
  }, [initialData]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (result: any) => {
    const imageUrl = result.info.secure_url;
    setFormData((prev) => ({ ...prev, coverImage: imageUrl }));
    setPreviewImage(imageUrl);
    toast.success('Image uploaded successfully');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  
  // Simple Markdown Preview Component
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return <p className="text-zinc-400">No content to preview</p>;
    
    // Very basic markdown rendering (for preview only)
    const html = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      // Lists
      .replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$1. $2</li>')
      // Bold and Italic
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<em>$1</em>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="my-2">')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a class="text-blue-400 hover:underline" href="$2">$1</a>');
    
    return (
      <div 
        className="prose-sm prose-invert max-w-none rounded-md bg-zinc-900 p-4 h-full overflow-auto"
        dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} 
      />
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard/blog"
          className="text-zinc-400 hover:text-white flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog Posts
        </Link>
        
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave className="mr-2" />
          {isLoading ? 'Saving...' : 'Save Blog Post'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt || ''}
              onChange={handleChange}
              rows={2}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
              placeholder="Brief summary of the post"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author || 'Barelands'}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date || ''}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Related Photo
            </label>
            <select
              name="relatedPhotoId"
              value={formData.relatedPhotoId || ''}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
            >
              <option value="">None</option>
              {photos.map((photo) => (
                <option key={photo.id} value={photo.id}>
                  {photo.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Cover Image
            </label>
            
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-md"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    setFormData((prev) => ({ ...prev, coverImage: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                >
                  <FiX className="text-white" />
                </button>
              </div>
            ) : (
              <CldUploadWidget
                uploadPreset="landscape-photos"
                options={{
                  maxFiles: 1,
                  resourceType: "image",
                  clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
                }}
                onSuccess={handleImageUpload}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full h-48 border-2 border-dashed border-zinc-700 rounded-md flex flex-col items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500"
                  >
                    <FiImage size={36} className="mb-2" />
                    <span>Click to upload</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-zinc-300">
              Content (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setMarkdownPreview(!markdownPreview)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {markdownPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          
          {markdownPreview ? (
            renderMarkdown(formData.content || '')
          ) : (
            <textarea
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              rows={15}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-white font-mono focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600"
              placeholder="# Your blog post content here in Markdown format"
              required
            />
          )}
          
          <div className="text-sm text-zinc-400">
            <p>Markdown syntax: <code className="bg-zinc-700 px-1 rounded"># Header</code>, <code className="bg-zinc-700 px-1 rounded">**bold**</code>, <code className="bg-zinc-700 px-1 rounded">*italic*</code>, <code className="bg-zinc-700 px-1 rounded">[link](url)</code>, <code className="bg-zinc-700 px-1 rounded">![image](url)</code></p>
          </div>
        </div>
      </div>
    </form>
  );
} 