import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

async function suggestApply(code: string) {
  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Please suggest where to best apply the code.

                  give a max of 3 suggestions.

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

    const apply = await suggestApply(code);
    return NextResponse.json({ apply });
  } catch (error) {
    console.error("Error suggesting apply:", error);
    return NextResponse.json(
      { error: "Failed to suggest apply" },
      { status: 500 }
    );
  }
}
