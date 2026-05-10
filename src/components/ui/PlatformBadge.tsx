type Platform = "chatgpt" | "claude" | "gemini" | "grok" | "any";

const MAP: Record<string, string> = {
  claude: "pb-claude",
  chatgpt: "pb-gpt",
  gemini: "pb-gemini",
  grok: "pb-grok",
};
const LABEL: Record<string, string> = {
  claude: "Claude", chatgpt: "ChatGPT", gemini: "Gemini", grok: "Grok", any: "Any",
};

export function PlatformBadge({ platform }: { platform: string }) {
  if (platform === "any") return null;
  return <span className={`pbadge ${MAP[platform] ?? ""}`}>{LABEL[platform] ?? platform}</span>;
}
