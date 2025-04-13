import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import Video, { IVideo } from '@/models/Video';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(videos, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body: IVideo = await req.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: 'Please fill all fields' },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      trabsformation: {
        width: 1920,
        height: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = Video.create(videoData);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { err: 'Failed to create new video' },
      { status: 500 }
    );
  }
}
