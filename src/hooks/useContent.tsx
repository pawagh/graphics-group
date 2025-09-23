'use client';
import { useState, useEffect } from 'react';
import { WebsiteContent } from '@/lib/content';

export function useContent() {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

    fetchContent();
  }, []);

  const refreshContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error refreshing content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { content, isLoading, refreshContent };
}
