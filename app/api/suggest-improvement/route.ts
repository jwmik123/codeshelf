import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

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
        content: `Please suggest specific improvements for this code(if applicable).

                  Keep the suggestions concise and to a minimum and to the point AND DONT ADD A SUMMARY and add a code example for each suggestion.

                  Use proper markdown formatting with:
                    - Headers (#, ##)
                    - Bold (**text**)
                    - Lists (- or 1.)
                    - Code blocks (\`\`\`)
                    - Inline code (\`)

                  Here's the code:
${code}`,
      },
    ],
  });

  // Safely handle the response content
  const content = message.content[0] as TextBlock;
  if (!content) {
    throw new Error("Unexpected response format from Anthropic API");
  }

  return content.text;
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
