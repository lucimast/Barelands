"use client";

import { useState, useRef } from 'react';
import { Photo, BlogPost } from '@/lib/data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface BlogPostFormProps {
  onBlogPostAdded: (newBlogPost: BlogPost) => void;
  photos: Photo[];
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Summary is required").max(200, "Summary should be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  relatedPhotoId: z.string().optional(),
  coverImage: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BlogPostForm({ onBlogPostAdded, photos }: BlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      relatedPhotoId: "",
      coverImage: "",
    },
  });

  // Show notification with auto-dismiss
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle form submission
  const onSubmit = async (values: FormData) => {
    try {
      setIsSubmitting(true);
      
      // If a related photo is selected, use its image as the cover image if no specific cover image is provided
      let coverImageToUse = values.coverImage;
      if (!coverImageToUse && values.relatedPhotoId) {
        const selectedPhoto = photos.find(photo => photo.id === values.relatedPhotoId);
        if (selectedPhoto) {
          coverImageToUse = selectedPhoto.image;
        }
      }
      
      // Create the blog post object
      const newBlogPost: BlogPost = {
        id: crypto.randomUUID(),
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        relatedPhotoId: values.relatedPhotoId || undefined,
        coverImage: coverImageToUse || '/images/default-blog-cover.jpg',
        date: new Date().toISOString(),
        author: '@mybarelands'
      };
      
      // You would normally send this to an API
      // const response = await fetch('/api/blog', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newBlogPost),
      //   credentials: 'include'
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to add blog post');
      // }
      
      // Simulate successful response
      setTimeout(() => {
        // Call the callback with the new blog post
        onBlogPostAdded(newBlogPost);
        
        // Reset form
        form.reset();
        
        // Show success message
        showNotification("Blog post created successfully (placeholder functionality)", "success");
        
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error adding blog post:", error);
      showNotification("Failed to add blog post. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {notification && (
        <div className={`mb-4 p-4 rounded-md ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {notification.message}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-red-600">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog post title" {...field} className="text-red-600" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">Summary</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A brief summary of the blog post" 
                    {...field} 
                    className="h-20 text-red-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your blog post content here" 
                    {...field} 
                    className="h-40 text-red-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relatedPhotoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">Related Photo</FormLabel>
                <FormControl>
                  <select 
                    className="w-full rounded-md border border-gray-300 p-2 text-red-600 bg-white cursor-pointer"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    value={field.value || ""}
                  >
                    <option value="">None</option>
                    {photos.map((photo) => (
                      <option key={photo.id} value={photo.id}>
                        {photo.title}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">Cover Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter cover image URL or leave blank to use related photo" 
                    {...field} 
                    className="text-red-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {isSubmitting ? "Creating..." : "Create Blog Post"}
          </Button>
        </form>
      </Form>
    </>
  );
} 