import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages.mjs";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Code snippet is required" },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: `Analyze this code snippet and provide:
          1. A concise, descriptive title (max 6 words)
          2. The programming language used in lowercase
          3. A brief description of what the code does (max 2 sentences)
          4. Suggest a category for the code snippet (e.g. "Algorithms", "Data Structures", 
          "Web Development", "Machine Learning", "Security", "Performance", "Code Organization", 
          "Error Handling", "Security Considerations")

          Format your response as exactly 4 lines:
          Line 1: Title
          Line 2: Language
          Line 3: Description
          Line 4: Category

          Code to analyze:
          \`\`\`
          ${code}
          \`\`\``,
        },
      ],
    });

    // Safely handle the response content
    const content = message.content[0] as TextBlock;
    if (!content) {
      throw new Error("Unexpected response format from Anthropic API");
    }

    // Parse the response
    const lines = content.text.split("\n").filter((line) => line.trim() !== "");

    // Ensure we have exactly 3 lines
    if (lines.length < 3) {
      throw new Error("Unexpected response format: insufficient lines");
    }

    const result = {
      title: lines[0].trim(),
      language: lines[1].trim(),
      description: lines[2].trim(),
      category: lines[3].trim(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing code:", error);
    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}

// Types for the API response
export type CodeAnalysisResponse = {
  title: string;
  language: string;
  description: string;
  category: string;
};

export type CodeAnalysisError = {
  error: string;
};
