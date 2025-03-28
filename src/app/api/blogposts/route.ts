import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { blogPosts, BlogPost } from '@/lib/data';

// Return blogpost data
export async function GET() {
  try {
    return NextResponse.json({ posts: blogPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// Create a new blog post
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create a slug from the title
    const slugify = (text: string) => {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
    };
    
    // Generate a unique ID based on title
    const id = data.id || `${slugify(data.title)}-${uuidv4().substring(0, 8)}`;
    
    // Create new blog post object
    const newPost: BlogPost = {
      id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || '/images/default-blog-cover.jpg',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Barelands',
      relatedPhotoId: data.relatedPhotoId
    };
    
    // Add to the beginning of the array
    blogPosts.unshift(newPost);
    
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
    
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 