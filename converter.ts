#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import * as child_process from "child_process";
import * as os from "os";

/**
 * Interface for the request payload to GitHub AI API
 */
interface GithubAIRequest {
  model: string;
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
}

/**
 * Interface for the response from GitHub AI API
 */
interface GithubAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

/**
 * Configuration for the TypeScript conversion
 */
interface ConversionConfig {
  inputFile: string;
  outputFile: string;
  githubToken?: string;
}

/**
 * Process to convert JavaScript to TypeScript using GitHub AI models
 */
async function convertJsToTs(config: ConversionConfig): Promise<void> {
  try {
    const { inputFile, outputFile, githubToken } = config;

    // Verify GitHub token
    const token = githubToken || process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error(
        "GitHub token is required. Set GITHUB_TOKEN environment variable or pass it as a parameter",
      );
    }

    console.log(`Reading ${inputFile}...`);
    const fileContent = fs.readFileSync(inputFile, "utf-8");

    // Read instructions from copilot-instructions.md file
    console.log("Reading instructions from copilot-instructions.md...");
    let instructions = "";
    try {
      const instructionsPath = path.resolve(
        process.cwd(),
        "copilot-instructions.md",
      );
      instructions = fs.readFileSync(instructionsPath, "utf-8");

      // Remove any markdown formatting if present
      if (instructions.includes("# Custom Copilot Instructions")) {
        instructions = instructions
          .replace(/^# Custom Copilot Instructions\s*/m, "")
          .trim();
      }

      // Add a directive to return only code
      instructions +=
        "\n- Return only the updated typescript code, no additional comments or explanations";
    } catch (err) {
      console.warn(
        "Warning: Could not read copilot-instructions.md. Using default instructions.",
      );
      instructions = `Convert this JavaScript to TypeScript with appropriate type annotations. Follow modern TypeScript best practices.
- Use explicit return types for functions
- Add proper parameter typing
- Use interfaces for complex objects
- Add JSDoc comments
- Return only the updated typescript code`;
    }

    console.log("Preparing request payload...");
    const payload: GithubAIRequest = {
      model: "openai/gpt-4.1",
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: fileContent,
        },
      ],
    };

    // Create temporary file for request payload
    const tempFile = path.join(os.tmpdir(), `payload-${Date.now()}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(payload));

    console.log("Calling GitHub REST API for model inference...");
    const curlCommand = `curl -L -s -X POST \\
      -H "Authorization: Bearer ${token}" \\
      -H "Accept: application/vnd.github+json" \\
      -H "X-GitHub-Api-Version: 2022-11-28" \\
      -H "Content-Type: application/json" \\
      -d @${tempFile} \\
      https://models.github.ai/inference/chat/completions`;

    const response = child_process.execSync(curlCommand).toString();

    // Save the raw response for inspection if needed
    const responseFile = "response.json";
    fs.writeFileSync(responseFile, response);
    console.log(`Response saved to ${responseFile}`);

    // Clean up the temp file
    fs.unlinkSync(tempFile);

    // Parse the response
    try {
      const parsedResponse = JSON.parse(response) as GithubAIResponse;

      if (parsedResponse.error) {
        throw new Error(`API Error: ${parsedResponse.error.message}`);
      }

      // Extract content
      const content = parsedResponse.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("No content in response");
      }

      // Process content to remove markdown code blocks
      const processedContent = content
        .replace(/^```(typescript|ts|javascript|js)?/gm, "")
        .replace(/```$/gm, "")
        .trim();

      // Write to output file
      fs.writeFileSync(outputFile, processedContent);
      console.log(`TypeScript conversion saved to ${outputFile}`);

      // Show stats
      const inputStats = fs.statSync(inputFile);
      const outputStats = fs.statSync(outputFile);
      console.log(`\nComparison:`);
      console.log(`Original JS file size: ${inputStats.size} bytes`);
      console.log(`New TypeScript file size: ${outputStats.size} bytes`);

      // Show preview
      console.log(`\nPreview of the TypeScript file (first 10 lines):`);
      const preview = fs
        .readFileSync(outputFile, "utf-8")
        .split("\n")
        .slice(0, 10)
        .join("\n");
      console.log(preview);
    } catch (e) {
      console.error("Failed to process API response:", e);
      console.error("Raw response:", response);
      throw new Error("Failed to process API response");
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Make file executable when bundled with esbuild
if (require.main === module) {
  // Handle process.argv differently for better compatibility with bundled version
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: converter.js <inputFile.js>");
    process.exit(1);
  }
  const inputFile = args[0];
  // Always derive the output file from input file with .ts extension
  const outputFile = inputFile.replace(/\.[^/.]+$/, ".ts");

  // When running from CLI, execute immediately
  console.log(`Starting conversion of ${inputFile} to ${outputFile}...`);
  convertJsToTs({
    inputFile,
    outputFile,
    githubToken: process.env.GITHUB_TOKEN,
  }).catch((err) => {
    console.error("Conversion failed:", err.message);
    process.exit(1);
  });
}

// Export the function for use as a module
export { convertJsToTs };
