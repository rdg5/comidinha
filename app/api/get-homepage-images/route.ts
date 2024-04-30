import { S3 } from 'aws-sdk'
import { NextResponse } from 'next/server'

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function GET() {
  const bucketName = process.env.AWS_BUCKET_NAME
  if (!bucketName) {
    console.error('S3 Bucket name is undefined.')
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

    if (!Contents || Contents.length === 0) {
      return NextResponse.json({ error: 'No images found' }, { status: 404 })
    }

    let imageUrls = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * Contents.length)
      const randomImageKey = Contents[randomIndex].Key
      const imageUrl = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: randomImageKey,
        Expires: 60,
      })
      imageUrls.push(imageUrl)
    }

    return NextResponse.json({ imageUrls })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images', details: error.message },
      { status: 500 },
    )
  }
}
