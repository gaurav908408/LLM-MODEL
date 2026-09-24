import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

async function main() {
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: "tem me today temprature",
  });
  console.log(interaction.output_text);
}

main();