import { type AnalyticsProps } from '@vercel/analytics/react';
import { track as vercelTrack } from '@vercel/analytics';

// This is a wrapper around Vercel Analytics to provide additional functionality
// and centralize analytics-related code

// Event types
export type AnalyticsEventName = 
  | 'page_view'
  | 'photo_view'
  | 'category_filter'
  | 'contact_form_submit'
  | 'admin_login'
  | 'photo_upload'
  | 'photo_delete';

// Define the type based on what Vercel Analytics accepts
type AllowedValueTypes = string | number | boolean | null;

export type AnalyticsEventData = {
  [key: string]: AllowedValueTypes;
};

// Shared analytics function to track events
// This function will be called from components that need to track events
export function trackEvent(
  eventName: AnalyticsEventName,
  eventData?: AnalyticsEventData
) {
  // In development, just log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, eventData);
    return;
  }

  // In production, track with Vercel Analytics
  try {
    vercelTrack(eventName, eventData);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Analytics props for the Vercel Analytics component
export const analyticsProps: AnalyticsProps = {
  debug: process.env.NODE_ENV === 'development',
  mode: 'production',
}; 