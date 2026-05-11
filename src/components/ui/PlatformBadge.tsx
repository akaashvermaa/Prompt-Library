type Platform = "chatgpt" | "claude" | "gemini" | "grok" | "any" | "midjourney" | "dalle3" | "imagen4" | "stablediffusion";

const MAP: Record<string, string> = {
  claude: "pb-claude",
  chatgpt: "pb-gpt",
  gemini: "pb-gemini",
  grok: "pb-grok",
  midjourney: "pb-midjourney",
  dalle3: "pb-dalle3",
  imagen4: "pb-imagen4",
  stablediffusion: "pb-stablediffusion",
};
const LABEL: Record<string, string> = {
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  grok: "Grok",
  any: "Any",
  midjourney: "Midjourney",
  dalle3: "DALL-E 3",
  imagen4: "Imagen 4",
  stablediffusion: "Stable Diffusion",
};

export function PlatformBadge({ platform }: { platform: string }) {
  if (platform === "any") return null;
  return <span className={`pbadge ${MAP[platform] ?? ""}`}>{LABEL[platform] ?? platform}</span>;
}
