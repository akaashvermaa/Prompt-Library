interface PlatformBadgeProps {
  platform: string;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const getPlatformStyle = (platform: string) => {
    switch (platform) {
      case "chatgpt":
        return "bg-green-600 text-white";
      case "claude":
        return "bg-orange-600 text-white";
      case "gemini":
        return "bg-blue-600 text-white";
      case "grok":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getPlatformLabel = (platform: string) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${getPlatformStyle(platform)}`}
    >
      {getPlatformLabel(platform)}
    </span>
  );
}