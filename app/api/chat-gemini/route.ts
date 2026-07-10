import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { message, documentId } = await req.json();

    const { data, error } = await supabase
      .from("documents")
      .select("content")
      .eq("id", documentId)
      .single();

    if (error) {
      throw error;
    }

    const prompt = `
You are an AI Second Brain.

Answer ONLY using the document below.

Document:
${data.content}

Question:
${message}

If the answer is not present in the document, reply:
"I couldn't find that information in the uploaded document."
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      reply: response.text,
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