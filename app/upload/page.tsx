'use client';

import VideoUploadForm from '@/app/components/VIdeoUploadForm';
import Link from 'next/link';

export default function VideoUploadPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Link href='/' className='hover:underline hover:text-primary'>
        Go Home
      </Link>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
