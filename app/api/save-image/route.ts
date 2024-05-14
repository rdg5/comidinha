import { createClient, Transaction } from 'edgedb'
import { NextResponse } from 'next/server'

const client = createClient()

interface RequestBody {
  userId: string
  imageUrl: string
}

export const POST = async (request: Request) => {
  let requestBody: RequestBody

  try {
    requestBody = await request.json()
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 },
    )
  }

  const { userId, imageUrl } = requestBody

  if (!userId || !imageUrl) {
    return NextResponse.json(
      { error: 'Missing userId or imageUrl in the request body' },
      { status: 400 },
    )
  }

  try {
    await client.transaction(async (tx: Transaction) => {
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
