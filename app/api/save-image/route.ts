import { createClient } from 'edgedb'
import { NextResponse } from 'next/server'

const client = createClient()

export const POST = async (request) => {
  const { userId, imageUrl } = await request.json()

  if (!userId || !imageUrl) {
    return NextResponse.json(
      { error: 'Missing userId or imageUrl in the request body' },
      { status: 400 },
    )
  }

  try {
    await client.transaction(async (tx) => {
      await tx.querySingle(
        `
        INSERT Photo {
          PhotoURL := <str>$1,
          UploadDate := cal::to_local_date(datetime_current(), 'UTC'),
          User := (SELECT User FILTER .UserID = <uuid>$0 LIMIT 1)
        };
      `,
        [userId, imageUrl],
      )
    })

    return NextResponse.json(
      { message: 'Image saved successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error saving image:', error)
    return NextResponse.json(
      { error: 'Error saving image to the database' },
      { status: 500 },
    )
  }
}
