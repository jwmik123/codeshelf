// app/api/suggest-improvements/route.ts
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

async function suggestImprovements(code: string) {
  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Please suggest specific improvements for this code(if applicable), including:
1. Performance optimizations
2. Better practices
3. Code organization
4. Error handling
5. Security considerations

Here's the code:

${code}`,
      },
    ],
  });

  return message.content;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const improvements = await suggestImprovements(code);
    return NextResponse.json({ improvements });
  } catch (error) {
    console.error("Error suggesting improvements:", error);
    return NextResponse.json(
      { error: "Failed to suggest improvements" },
      { status: 500 }
    );
  }
}
