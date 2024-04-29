import { S3 } from 'aws-sdk'
import { NextResponse } from 'next/server'

const s3 = new S3({
  useDualstackEndpoint: true,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  s3ForcePathStyle: true,
})

export const GET = async () => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME

    const { Contents } = await s3
      .listObjectsV2({ Bucket: bucketName })
      .promise()

    if (!Contents || Contents.length === 0) {
      return NextResponse.json({ error: 'No images found in the bucket' })
    }

    const randomIndex = Math.floor(Math.random() * Contents.length)
    const randomImageKey = Contents[randomIndex].Key

    const imageUrl = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: randomImageKey,
      Expires: 60,
    })

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Failed to fetch random image:', error)
    return NextResponse.json({
      error: 'Failed to fetch image from bucket',
      details: error.message,
    })
  }
}
