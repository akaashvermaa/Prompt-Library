const ITEMS = [
  { label: "study & learning", italic: true },
  { label: "code review", italic: false },
  { label: "essay outlines", italic: true },
  { label: "teaching prompts", italic: false },
  { label: "business & email", italic: true },
  { label: "qa & testing", italic: false },
  { label: "linkedin posts", italic: true },
  { label: "review & feedback", italic: false },
];

const ALL = [...ITEMS, ...ITEMS];

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