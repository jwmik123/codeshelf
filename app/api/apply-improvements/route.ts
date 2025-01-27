import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

async function applyImprovements(code: string, improvements: string) {
  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Please apply the following improvements to the code:

                  ${improvements}

                  ONLY return the improved code without any other text or explanation 
                  also dont add the language tags like \`\`\`javascript or \`\`\`python or \`\`\`any language or "Here is the improved code:".

                  Just the output the code, nothing else.

                  Here's the code you need to improve:
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
    const { code, improvements } = body;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const codeWithImprovements = await applyImprovements(code, improvements);
    return NextResponse.json({ codeWithImprovements });
  } catch (error) {
    console.error("Error suggesting improvements:", error);
    return NextResponse.json(
      { error: "Failed to suggest improvements" },
      { status: 500 }
    );
  }
}
