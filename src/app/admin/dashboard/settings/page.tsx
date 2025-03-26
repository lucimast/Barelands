"use client";

import { useState } from 'react';
import { FiSave, FiRefreshCw } from 'react-icons/fi';

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: 'Landscape Photographer',
    siteDescription: 'Capturing the beauty of nature through photography',
    contactEmail: 'contact@example.com',
    socialLinks: {
      instagram: 'https://instagram.com/example',
      facebook: 'https://facebook.com/example',
      twitter: 'https://twitter.com/example'
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Settings</h2>
          
          <div>
            <label htmlFor="siteTitle" className="block text-sm font-medium text-zinc-400">
              Site Title
            </label>
            <input
              type="text"
              id="siteTitle"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-zinc-400">
              Site Description
            </label>
            <textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-zinc-400">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-zinc-800 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Social Links</h2>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-zinc-400">
              Instagram URL
            </label>
            <input
              type="url"
              id="instagram"
              value={settings.socialLinks.instagram}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, instagram: e.target.value }
              })}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-zinc-400">
              Facebook URL
            </label>
            <input
              type="url"
              id="facebook"
              value={settings.socialLinks.facebook}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, facebook: e.target.value }
              })}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-zinc-400">
              Twitter URL
            </label>
            <input
              type="url"
              id="twitter"
              value={settings.socialLinks.twitter}
              onChange={(e) => setSettings({
                ...settings,
                socialLinks: { ...settings.socialLinks, twitter: e.target.value }
              })}
              className="mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <FiRefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Saving...
              </>
            ) : (
              <>
                <FiSave className="-ml-1 mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Save Status */}
        {saveStatus === 'success' && (
          <div className="text-green-500 text-sm">Settings saved successfully!</div>
        )}
        {saveStatus === 'error' && (
          <div className="text-red-500 text-sm">Failed to save settings. Please try again.</div>
        )}
      </form>
    </div>
  );
} 