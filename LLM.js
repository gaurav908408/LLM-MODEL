import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

const History = [];
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function Chat(userProblem) {
  History.push({
    role: "user",
    parts: [{ text: userProblem }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History,
  });

  const replyText = response.text;

  History.push({
    role: "model",
    parts: [{ text: replyText }],
  });

  console.log("\nAI:", replyText, "\n");
}

async function main() {
  while (true) {
    const userProblem = readlineSync.question("Ask Me Anything (type 'exit' to quit) --> ");

    if (userProblem.trim().toLowerCase() === "exit" || userProblem.trim().toLowerCase() === "quit") {
      console.log("Goodbye!");
      break;
    }

    if (!userProblem.trim()) continue;

    await Chat(userProblem);
  }
}

main();