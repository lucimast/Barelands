"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { photoCategories } from "@/lib/data";
import { FiUploadCloud, FiX, FiArrowLeft } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";

export default function UploadPhoto() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState({
    title: "",
    category: photoCategories[0] === "All" ? photoCategories[1] : photoCategories[0],
    location: "",
    description: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPhoto({ ...photo, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      previewFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select an image file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    if (!previewUrl) {
      toast.error("Please select an image to upload");
      setIsUploading(false);
      return;
    }

    try {
      // Track the upload start
      trackEvent('photo_upload', {
        category: photo.category,
        status: 'started'
      });

      // Get the file from the file input
      const fileInput = fileInputRef.current;
      const file = fileInput?.files?.[0];
      
      if (!file) {
        throw new Error('No file selected');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        throw new Error(`File size exceeds 10MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} is not supported. Please use JPG, PNG, or WEBP.`);
      }

      console.log('Uploading file:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`
      });

      // Create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', photo.title);
      formData.append('category', photo.category);
      formData.append('location', photo.location || '');
      formData.append('description', photo.description || '');
      
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      });

      // First try to parse response as JSON
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, get text and log it
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Server returned an invalid response format');
      }

      if (!response.ok) {
        // If we have detailed error information, use it
        if (data.details) {
          throw new Error(`${data.error}: ${data.details}`);
        }
        throw new Error(data.error || 'Failed to upload photo');
      }

      // Track successful upload
      trackEvent('photo_upload', {
        category: photo.category,
        status: 'completed',
        photo_id: data.photo?.id
      });

      toast.success("Photo uploaded successfully!");
      
      // Refresh the page data to show the new photo
      router.refresh();
      
      // Navigate to photos page
      router.push("/admin/photos");
    } catch (error) {
      // Track failed upload
      trackEvent('photo_upload', {
        category: photo.category,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const removePreview = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="text-zinc-400 hover:text-white p-0 mb-4"
        >
          <Link href="/admin/photos">
            <FiArrowLeft className="mr-2 h-4 w-4" /> Back to Photos
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Upload New Photo</h1>
        <p className="text-zinc-400">
          Add a new landscape photograph to your portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div>
          <div
            className={`border-2 border-dashed rounded-lg p-4 h-[400px] flex flex-col items-center justify-center cursor-pointer ${
              isDragging
                ? "border-white bg-zinc-800/60"
                : "border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800/50 hover:border-zinc-600"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removePreview();
                  }}
                >
                  <FiX className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <FiUploadCloud className="h-10 w-10 text-zinc-500 mb-4" />
                <p className="text-zinc-400 mb-2 text-center">
                  <span className="font-medium text-white">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-zinc-500 text-sm text-center">
                  JPG, PNG or WEBP (max. 10MB)
                </p>
              </>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Photo Title</Label>
            <Input
              id="title"
              name="title"
              value={photo.title}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={photo.category}
              onChange={handleInputChange}
              className="w-full rounded-md bg-zinc-800 border-zinc-700 text-zinc-100 p-2"
              required
            >
              {photoCategories
                .filter(category => category !== "All")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={photo.location}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={photo.description}
              onChange={handleInputChange}
              className="w-full min-h-[100px] rounded-md bg-zinc-800 border border-zinc-700 text-zinc-100 p-2"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-zinc-900"
              disabled={isUploading || !previewUrl}
            >
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
