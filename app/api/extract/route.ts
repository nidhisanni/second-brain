import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { storagePath } = await req.json();

    return NextResponse.json({
      message: "Extract endpoint is working!",
      storagePath,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}