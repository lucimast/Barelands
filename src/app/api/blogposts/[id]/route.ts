import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { blogPosts, BlogPost } from '@/lib/data';

// Make this route compatible with static export
export const dynamic = 'force-static';

// Generate static params for all blog post IDs
export function generateStaticParams() {
  return blogPosts.map(post => ({
    id: post.id,
  }));
}

// Get a single blog post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = blogPosts.find(p => p.id === params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Update a blog post
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postIndex = blogPosts.findIndex(p => p.id === params.id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const data = await request.json();
    const updatedPost: BlogPost = {
      ...blogPosts[postIndex],
      title: data.title || blogPosts[postIndex].title,
      excerpt: data.excerpt || blogPosts[postIndex].excerpt,
      content: data.content || blogPosts[postIndex].content,
      coverImage: data.coverImage || blogPosts[postIndex].coverImage,
      date: data.date || blogPosts[postIndex].date,
      author: data.author || blogPosts[postIndex].author,
      relatedPhotoId: data.relatedPhotoId !== undefined ? data.relatedPhotoId : blogPosts[postIndex].relatedPhotoId
    };
    
    // Update the post in the array
    blogPosts[postIndex] = updatedPost;
    
    // Get the data.ts file path
    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Find the blogPosts array in the content and replace it
    const updatedContent = dataFileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/,
      () => {
        const serializedPosts = JSON.stringify(blogPosts, null, 2)
          .replace(/\"([^"]+)\":/g, '$1:') // Convert "key": to key:
          .replace(/\"/g, '\'')           // Replace remaining double quotes with single quotes
          .replace(/\n/g, '\n  ');        // Add 2 spaces indentation
        
        return `export const blogPosts: BlogPost[] = ${serializedPosts};`;
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(dataFilePath, updatedContent);
    
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// Delete a blog post
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postIndex = blogPosts.findIndex(p => p.id === params.id);
    
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Remove the post from the array
    const removedPost = blogPosts.splice(postIndex, 1)[0];
    
    // Get the data.ts file path
    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
    
    // Find the blogPosts array in the content and replace it
    const updatedContent = dataFileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[([\s\S]*?)\];/,
      () => {
        const serializedPosts = JSON.stringify(blogPosts, null, 2)
          .replace(/\"([^"]+)\":/g, '$1:') // Convert "key": to key:
          .replace(/\"/g, '\'')           // Replace remaining double quotes with single quotes
          .replace(/\n/g, '\n  ');        // Add 2 spaces indentation
        
        return `export const blogPosts: BlogPost[] = ${serializedPosts};`;
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(dataFilePath, updatedContent);
    
    return NextResponse.json({ success: true, post: removedPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 