'use client'
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'
import Sidebar from '../components/Sidebar'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

interface ImageUrlsResponse {
  imageUrls: string[]
}

export default function HomePage() {
  const [images, setImages] = useState<string[]>([])
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const { user } = useUser()
  const href = user ? '/dashboard' : '/sign-up'

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/get-homepage-images')
        const data: ImageUrlsResponse = await response.json()
        if (data.imageUrls && data.imageUrls.length) {
          setImages(data.imageUrls)
        } else {
          console.error('No images found or invalid response:', data)
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    }
    fetchImages()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const { current } = imageContainerRef
        if (current) {
          const currentIndex = Math.round(
            current.scrollTop / window.innerHeight,
          )
          const nextIndex = currentIndex + (event.key === 'ArrowDown' ? 1 : -1)
          const nextElement = current.children[nextIndex] as HTMLDivElement
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="flex h-screen bg-green-900">
      <div
        ref={imageContainerRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory bg-green-200 p-2 border-2 border-green-600 shadow-lg"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="h-screen snap-start flex justify-center items-center bg-green-100 p-4 border border-green-200 shadow"
          >
            <Image
              src={src}
              width={100}
              height={100}
              alt={`Image ${index + 1}`}
              className="w-1/4 max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
      <Sidebar href={href} />
    </div>
  )
}
