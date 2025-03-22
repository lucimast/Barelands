"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { photoCategories } from "@/lib/data";
import { FiArrowLeft } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";
import CloudinaryUpload from "@/components/CloudinaryUpload";

export default function UploadPhoto() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState({
    title: "",
    category: photoCategories[0] === "All" ? photoCategories[1] : photoCategories[0],
    location: "",
    description: "",
    image: "", // This will store the Cloudinary URL
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPhoto({ ...photo, [name]: value });
  };

  const handleCloudinaryUpload = (result: { public_id: string; secure_url: string }) => {
    setPhoto({ ...photo, image: result.secure_url });
    toast.success("Image uploaded successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    if (!photo.image) {
      toast.error("Please upload an image");
      setIsUploading(false);
      return;
    }

    try {
      // Track the upload start
      trackEvent('photo_upload', {
        category: photo.category,
        status: 'started'
      });

      // Create data object to send
      const photoData = {
        title: photo.title,
        category: photo.category,
        location: photo.location || '',
        description: photo.description || '',
        image: photo.image, // Cloudinary URL
      };
      
      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoData),
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

      toast.success("Photo saved successfully!");
      
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
          <div className="border-2 border-dashed rounded-lg p-4 h-[400px] flex flex-col items-center justify-center bg-zinc-800/30 border-zinc-700">
            {photo.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={photo.image}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => setPhoto({ ...photo, image: "" })}
                >
                  <span className="h-4 w-4">×</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-zinc-400 mb-6 text-center">
                  <span className="font-medium text-white">
                    Upload your landscape photograph
                  </span>
                  <br />
                  JPG, PNG, WebP up to 10MB
                </p>
                <CloudinaryUpload onUploadSuccess={handleCloudinaryUpload} />
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={photo.title}
              onChange={handleInputChange}
              placeholder="Beautiful Sunset"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={photo.category}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800/30 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={photo.location}
              onChange={handleInputChange}
              placeholder="Grand Canyon, Arizona"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={photo.description}
              onChange={handleInputChange}
              placeholder="A breathtaking sunset over the canyon..."
              className="flex min-h-[80px] w-full rounded-md border border-zinc-700 bg-zinc-800/30 px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Button type="submit" disabled={isUploading || !photo.image || !photo.title}>
            {isUploading ? "Saving..." : "Save Photo"}
          </Button>
        </form>
      </div>
    </div>
  );
}
