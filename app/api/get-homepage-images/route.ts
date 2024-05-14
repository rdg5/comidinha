import { S3 } from 'aws-sdk'
import { NextResponse } from 'next/server'

const s3 = new S3({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

const bucketName = process.env.AWS_BUCKET_NAME as string

export const GET = async () => {
  if (!bucketName) {
    return NextResponse.json(
      {
        error: 'Server configuration error',
        details: 'Bucket name is missing.',
      },
      { status: 500 },
    )
  }

  try {
    const { Contents } = await s3
      .listObjectsV2({ Bucket: bucketName })
      .promise()

    if (!Contents || Contents.length < 5) {
      return NextResponse.json(
        { error: 'Not enough images in the bucket' },
        { status: 404 },
      )
    }

    const uniqueKeys = new Set<string>()
    const imageUrls: string[] = []
    while (uniqueKeys.size < 5 && uniqueKeys.size < Contents.length) {
      const randomIndex = Math.floor(Math.random() * Contents.length)
      const object = Contents[randomIndex]

      if (object.Key && !uniqueKeys.has(object.Key)) {
        uniqueKeys.add(object.Key)
        const imageUrl = s3.getSignedUrl('getObject', {
          Bucket: bucketName,
          Key: object.Key,
          Expires: 60, // URL valid for 60 seconds
        })
        imageUrls.push(imageUrl)
      }
    }

    if (imageUrls.length < 5) {
      return NextResponse.json(
        { error: 'Could not find enough unique images' },
        { status: 404 },
      )
    }

    const response = NextResponse.json({ imageUrls })
    response.headers.set('Link', `<${imageUrls[0]}>; rel=preload; as=image`)
    return response
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 },
    )
  }
}
