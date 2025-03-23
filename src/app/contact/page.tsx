"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiMail, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// JotForm endpoint - most reliable option for contact forms
const FORM_ENDPOINT = "https://form.jotform.com/241253785048058";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle URL query parameters for pre-filling the form
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const subject = params.get('subject');
      const message = params.get('message');
      
      if (subject) {
        form.setValue('subject', subject);
      }
      
      if (message) {
        form.setValue('message', message);
      }
    }
  }, [form]);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
          >
            <FiHome className="mr-2" /> Back to Home
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Contact Barelands</h1>
            <p className="text-zinc-300 max-w-lg mx-auto">
              Have questions about my photographs or interested in collaborating? 
              Fill out the form below, and I'll get back to you as soon as possible.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 rounded-lg border border-zinc-800 p-8"
          >
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                  <FiSend className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
                <p className="text-zinc-300 mb-6">
                  Thank you for reaching out. I'll respond to your message as soon as possible.
                </p>
                <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form 
                  ref={formRef}
                  method="POST"
                  action={FORM_ENDPOINT}
                  target="hidden_iframe"
                  onSubmit={(e) => {
                    const isValid = form.formState.isValid;
                    if (!isValid) {
                      e.preventDefault(); // Don't submit if validation fails
                      return;
                    }
                    
                    // Track the form submission event
                    trackEvent('contact_form_submit', {
                      subject: form.getValues().subject
                    });
                    
                    // Let the form submit to JotForm
                    setIsSubmitting(true);
                    
                    // Automatically show success after a short timeout
                    // This is a fallback in case the iframe message doesn't work
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setSuccess(true);
                      form.reset();
                    }, 2000);
                  }}
                  className="space-y-6"
                >
                  {/* Hidden iframe to prevent page navigation */}
                  <iframe 
                    ref={iframeRef}
                    name="hidden_iframe" 
                    id="hidden_iframe" 
                    style={{ display: 'none' }} 
                    onLoad={() => {
                      if (isSubmitting) {
                        setIsSubmitting(false);
                        setSuccess(true);
                        form.reset();
                      }
                    }}
                  />
                  
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FiUser className="absolute left-3 top-3 text-zinc-500" />
                              <Input
                                placeholder="John Doe"
                                className="pl-10 bg-zinc-800 border-zinc-700"
                                {...field}
                                name="q3_name"
                              />
                            </div>
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
                            <div className="relative">
                              <FiMail className="absolute left-3 top-3 text-zinc-500" />
                              <Input
                                type="email"
                                placeholder="johndoe@example.com"
                                className="pl-10 bg-zinc-800 border-zinc-700"
                                {...field}
                                name="q4_email"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is your message about?"
                            className="bg-zinc-800 border-zinc-700"
                            {...field}
                            name="q5_subject"
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
                          <div className="relative">
                            <FiMessageSquare className="absolute left-3 top-3 text-zinc-500" />
                            <Textarea
                              rows={6}
                              placeholder="Please provide details about your inquiry..."
                              className="pl-10 bg-zinc-800 border-zinc-700"
                              {...field}
                              name="q6_message"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
} 