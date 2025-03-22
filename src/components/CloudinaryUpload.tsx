'use client';

import { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

// Match the expected type for CloudinaryUploadWidgetResults
type CloudinaryUploadResult = {
  event: string | undefined;
  info: {
    public_id: string;
    secure_url: string;
  };
};

interface CloudinaryUploadProps {
  onUploadSuccess?: (result: { public_id: string; secure_url: string }) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
}

export default function CloudinaryUpload({
  onUploadSuccess,
  onUploadError,
  className = '',
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = (result: any) => {
    setIsUploading(false);
    if (result.info && result.info.secure_url) {
      console.log('Upload successful:', result.info.secure_url);
      
      // Call the onUploadSuccess callback if provided
      if (onUploadSuccess) {
        onUploadSuccess({
          public_id: result.info.public_id,
          secure_url: result.info.secure_url,
        });
      }
      
      // Refresh the page data
      router.refresh();
    }
  };

  const handleUploadError = (error: any) => {
    setIsUploading(false);
    console.error('Upload error:', error);
    if (onUploadError) {
      onUploadError(error);
    }
  };

  return (
    <div>
      <CldUploadButton
        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onUpload={handleUploadSuccess}
        onError={handleUploadError}
        options={{
          sources: ['local', 'url', 'camera'],
          multiple: false,
          maxFiles: 1,
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
          maxFileSize: 10000000, // 10MB
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </CldUploadButton>
    </div>
  );
} 