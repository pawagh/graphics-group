'use client';
import { useState, useEffect, useCallback } from 'react';
import { WebsiteContent } from '@/lib/content';

interface ContentEditorProps {
  onSave?: () => void;
}

export default function ContentEditor({ onSave }: ContentEditorProps) {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced update function (for future use)
  const debouncedUpdate = useCallback((field: string, value: string) => {
    // Future implementation for auto-save functionality
    console.log('Field updated:', field, value);
  }, []);

  const handleSave = async (section: string, updates: Record<string, string | Record<string, unknown>>) => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      let endpoint = '/api/content/homepage';
      let payload = updates;

      // Handle different section types with correct data structure
      if (section === 'footer') {
        endpoint = '/api/content';
        payload = { footer: updates };
      } else if (section === 'meta') {
        endpoint = '/api/content';
        payload = { meta: updates };
      } else if (section === 'homepage') {
        endpoint = '/api/content/homepage';
        payload = updates;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSaveMessage('✅ Changes saved successfully!');
        
        // Update local state based on section
        setContent(prev => {
          if (!prev) return prev;
          
          if (section === 'homepage') {
            return { ...prev, homepage: { ...prev.homepage, ...updates } };
          } else if (section === 'footer') {
            return { ...prev, footer: { ...prev.footer, ...updates } };
          } else if (section === 'meta') {
            return { ...prev, meta: { ...prev.meta, ...updates } };
          }
          return prev;
        });
        
        onSave?.();
      } else {
        setSaveMessage('❌ Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveMessage('❌ Error saving changes');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Remove debounce function as it's not being used properly
  // const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
  //   let timeoutId: NodeJS.Timeout;
  //   return (...args: Parameters<T>) => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func(...args), delay);
  //   };
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-carolina-blue"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center p-8 text-red-600">
        Failed to load content. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {saveMessage}
        </div>
      )}

      {/* Homepage Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Homepage Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lab Name
            </label>
            <input
              type="text"
              value={content.homepage.labName}
              onChange={(e) => {
                const value = e.target.value;
                setContent(prev => prev ? {
                  ...prev,
                  homepage: { ...prev.homepage, labName: value }
                } : prev);
                debouncedUpdate('homepage.labName', value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Us Section
            </label>
            <textarea
              rows={4}
              value={content.homepage.aboutUs}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                homepage: { ...prev.homepage, aboutUs: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={content.homepage.contactEmail}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                homepage: { ...prev.homepage, contactEmail: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              value={content.homepage.heroTitle}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                homepage: { ...prev.homepage, heroTitle: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Subtitle
            </label>
            <input
              type="text"
              value={content.homepage.heroSubtitle}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                homepage: { ...prev.homepage, heroSubtitle: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <button
            onClick={() => handleSave('homepage', content.homepage)}
            disabled={isSaving}
            className="bg-carolina-blue hover:bg-unc-navy text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Homepage Content'}
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={content.footer.address}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                footer: { ...prev.footer, address: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University
            </label>
            <input
              type="text"
              value={content.footer.university}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                footer: { ...prev.footer, university: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Email
            </label>
            <input
              type="email"
              value={content.footer.email}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                footer: { ...prev.footer, email: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter URL
            </label>
            <input
              type="url"
              value={content.footer.socialLinks.twitter}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                footer: { 
                  ...prev.footer, 
                  socialLinks: { ...prev.footer.socialLinks, twitter: e.target.value }
                }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => handleSave('footer', content.footer)}
            disabled={isSaving}
            className="bg-carolina-blue hover:bg-unc-navy text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Footer Content'}
          </button>
        </div>
      </div>

      {/* SEO Meta Tags */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Meta Tags</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={content.meta.title}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                meta: { ...prev.meta, title: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={content.meta.description}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                meta: { ...prev.meta, description: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords
            </label>
            <input
              type="text"
              value={content.meta.keywords}
              onChange={(e) => setContent(prev => prev ? {
                ...prev,
                meta: { ...prev.meta, keywords: e.target.value }
              } : prev)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carolina-blue focus:border-carolina-blue"
            />
          </div>

          <button
            onClick={() => handleSave('meta', content.meta)}
            disabled={isSaving}
            className="bg-carolina-blue hover:bg-unc-navy text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
