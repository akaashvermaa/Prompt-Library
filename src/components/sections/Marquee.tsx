const ITEMS = [
  { label: "Systemic Architectures", italic: true },
  { label: "Agentic Workflows", italic: false },
  { label: "Dense Reasoning", italic: true },
  { label: "Visual Generation", italic: false },
  { label: "Code Diagnostics", italic: true },
  { label: "Strategic Marketing", italic: false },
  { label: "Academic Synthesis", italic: true },
  { label: "Zero-Shot Optimization", italic: false },
  { label: "Chain-of-Thought", italic: true },
];

const ALL = [...ITEMS, ...ITEMS, ...ITEMS]; // Triple for smoother loop

export function Marquee() {
  return (
    <div className="strip">
      <div className="strip-track">
        {ALL.map((item, i) => (
          <span key={i} className="strip-item">
            <span className="star"></span>
            {item.italic ? <span className="it">{item.label}</span> : item.label}
          </span>
        ))}
      </div>
    </div>
  );
}