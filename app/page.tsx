'use client';

import React, { useEffect, useState } from 'react';
import VideoFeed from '@/app/components/VIdeoFeed';
import { IVideo } from '@/models/Video';
import { apiClient } from '@/lib/api-client';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex items-start justify-between'>
        <h1 className='text-3xl font-bold mb-8'>ImageKit ReelsPro</h1>
        <Link href='/upload' className='flex font-bold border-2 p-2 rounded-xl'>
          Upload +
        </Link>
      </div>
      <VideoFeed videos={videos} />
    </main>
  );
}
