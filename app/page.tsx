'use client'

import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [vides, setVideos] = useState<IVideo[]>([]);
  
  useEffect (() => {
    const fetchVideos = async() => {
      try {
        const data = await apiClient.getVideos()
        setVideos(data)
      } catch (err) {
        console.log("Error fetching videos", err)
      }

      fetchVideos()
    }
  }, [])

  return (
    <div className=""></div>
  );
}
