"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { photos, photoCategories, type Photo } from "@/lib/data";
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
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiHome } from "react-icons/fi";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  photoId: z.string().optional(),
  photoTitle: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BuyPrintPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  
  // Create refs for the tabs
  const galleryTabRef = useRef<HTMLButtonElement>(null);
  const inquiryTabRef = useRef<HTMLButtonElement>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      photoId: "",
      photoTitle: "",
    },
  });

  // Filter photos by category
  const filteredPhotos = selectedCategory === "All"
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  // Handle photo selection
  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
    form.setValue("photoId", photo.id);
    form.setValue("photoTitle", photo.title);
    form.setValue(
      "message",
      `I'm interested in purchasing a print of "${photo.title}" (${photo.location}). Please provide me with details on available sizes, pricing, and shipping options.`
    );
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your inquiry has been sent successfully! We'll get back to you soon.");
      form.reset();
      setSelectedPhoto(null);
      
      // Switch back to gallery tab
      setActiveTab("gallery");
      if (galleryTabRef.current) {
        galleryTabRef.current.click();
      }
    } catch (error) {
      toast.error("Failed to send your inquiry. Please try again later.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to switch to inquiry tab
  const switchToInquiryTab = () => {
    setActiveTab("inquiry");
    if (inquiryTabRef.current) {
      inquiryTabRef.current.click();
    }
  };

  // Function to switch to gallery tab
  const switchToGalleryTab = () => {
    setActiveTab("gallery");
    if (galleryTabRef.current) {
      galleryTabRef.current.click();
    }
  };

  return (
    <main className="pt-20 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          >
            <FiHome className="mr-2" /> Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Buy a Fine Art Print</h1>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Each photograph is printed on premium archival paper, ensuring exceptional detail, 
              color accuracy, and longevity. All prints are personally signed and include a 
              certificate of authenticity.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger 
                ref={galleryTabRef}
                value="gallery"
              >
                Browse Gallery
              </TabsTrigger>
              <TabsTrigger 
                ref={inquiryTabRef}
                value="inquiry" 
                disabled={!selectedPhoto}
              >
                Make Inquiry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="space-y-8">
              {/* Category Filter */}
              <div className="flex justify-center flex-wrap gap-2 mb-8">
                {photoCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === category
                        ? "bg-white text-zinc-900 font-medium"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Photo Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`cursor-pointer rounded-lg overflow-hidden group relative ${
                      selectedPhoto?.id === photo.id
                        ? "ring-2 ring-white"
                        : ""
                    }`}
                    onClick={() => handlePhotoSelect(photo)}
                  >
                    {/* Use dynamic aspect ratio based on orientation */}
                    <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white text-lg font-medium">
                          {photo.title}
                        </h3>
                        <p className="text-zinc-300 text-sm">{photo.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Select Photo Prompt */}
              {!selectedPhoto && (
                <div className="text-center mt-8 p-6 border border-dashed border-zinc-700 rounded-lg">
                  <p className="text-zinc-400">
                    Please select a photo above to proceed with your inquiry.
                  </p>
                </div>
              )}

              {/* Selected Photo Details */}
              {selectedPhoto && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 relative aspect-auto rounded overflow-hidden" style={{ minHeight: "200px" }}>
                      <Image
                        src={selectedPhoto.image}
                        alt={selectedPhoto.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-zinc-400 mb-3">
                        Location: {selectedPhoto.location}
                      </p>
                      <p className="text-zinc-300 mb-5">
                        {selectedPhoto.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Available Print Options:</h4>
                        <ul className="text-zinc-300 space-y-1">
                          <li>• Premium Fine Art Paper (Matte or Glossy)</li>
                          <li>• Gallery-Quality Canvas</li>
                          <li>• Metal Prints (Aluminum)</li>
                          <li>• Framing Options Available</li>
                        </ul>
                      </div>
                      <Button
                        className="mt-5"
                        onClick={switchToInquiryTab}
                      >
                        Inquire About This Print
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="inquiry">
              {selectedPhoto && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
                    <h3 className="text-xl font-medium mb-4">
                      Inquiry for "{selectedPhoto.title}"
                    </h3>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="bg-zinc-800 border-zinc-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="johndoe@example.com"
                                  {...field}
                                  className="bg-zinc-800 border-zinc-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={5}
                                  {...field}
                                  className="bg-zinc-800 border-zinc-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="space-x-4">
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Inquiry"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={switchToGalleryTab}
                          >
                            Back to Gallery
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                  <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 mt-6">
                    <h3 className="text-xl font-medium mb-4">What Happens Next?</h3>
                    <ol className="space-y-3 text-zinc-300">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-sm">1</span>
                        <p>We'll review your inquiry and respond within 24-48 hours.</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-sm">2</span>
                        <p>We'll provide detailed pricing options based on your preferences.</p>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 text-sm">3</span>
                        <p>Once you confirm, we'll prepare and ship your print with care.</p>
                      </li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
} 