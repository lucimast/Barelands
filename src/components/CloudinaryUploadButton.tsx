'use client';

import { useEffect } from 'react';
import { FiUpload } from 'react-icons/fi';

interface CloudinaryUploadButtonProps {
  onUpload: (url: string) => void;
  buttonText?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CloudinaryUploadButton = ({ onUpload, buttonText = 'Upload Photo' }: CloudinaryUploadButtonProps) => {
  useEffect(() => {
    console.log('CloudinaryUploadButton mounted');
    console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log('Upload preset:', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);
    
    // Add the Cloudinary Upload Widget script
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openWidget = () => {
    console.log('Upload button clicked');
    
    // Check if cloudinary is available
    if (!window.cloudinary) {
      console.error('Cloudinary widget script not loaded');
      return;
    }
    
    // Create and open the upload widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: 'landscape_photos',
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        folder: 'landscape-photos',
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1"
          }
        }
      },
      (error: any, result: any) => {
        console.log('Upload callback triggered');
        if (error) {
          console.error('Upload error:', error);
          return;
        }
        
        console.log('Upload result:', result);
        if (result.event === 'success') {
          console.log('Upload successful:', result.info);
          onUpload(result.info.secure_url);
          widget.close();
        }
      }
    );
    
    widget.open();
  };

  return (
    <button
      onClick={openWidget}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <FiUpload className="-ml-1 mr-2 h-4 w-4" />
      {buttonText}
    </button>
  );
};

export default CloudinaryUploadButton; 