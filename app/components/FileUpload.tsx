'use client';

import React from 'react';
import { IKUpload } from 'imagekitio-next';
import { Loader2 } from 'lucide-react';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: 'image' | 'video';
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = 'image',
}: FileUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log('Error', err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log('Success', res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(percentComplete);
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === 'video') {
      if (!file.type.startsWith('video/')) {
        setError('Please upload a video file');
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError('File size should be less than 100 MB');
        return false;
      }
    } else {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10 MB');
        return false;
      }
    }
    return false;
  };

  return (
    <div className='space-y-2'>
      <IKUpload
        fileName={fileType === 'video' ? 'video.mp4' : 'image.jpg'}
        useUniqueFileName={true}
        validateFile={validateFile}
        folder={fileType === 'video' ? '/loopsy-vid' : '/loopsy-img'}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        transformation={{
          pre: 'l-text,i-Imagekit,fs-50,l-end',
          post: [
            {
              type: 'transformation',
              value: 'w-100',
            },
          ],
        }}
      />

      {uploading && (
        <div className='flex items-center gap-2 text-sm text-primary'>
          <Loader2 className='animate-spin w-4 h-4' />
          <span>Uploading...</span>
        </div>
      )}

      {error && (
        <div className='text-error text-sm'>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
