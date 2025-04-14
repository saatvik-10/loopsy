import { IVideo } from '@/models/Video';

export type VideoFormData = Omit<IVideo, '_id'>;

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    const res = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  }

  async getVideos() {
    return this.fetch<IVideo[]>('/videos');
  }

  async getVideo(id: string) {
    return this.fetch<IVideo>(`/videos/${id}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch<IVideo>('/videos', {
      method: 'POST',
      body: videoData,
    });
  }
}

export const apiClient = new ApiClient();
